import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Types
export interface Feedback {
    id: string;
    name: string;
    email: string;
    message: string;
    context: 'Collaboration' | 'Project' | 'Consultation' | 'General';
    rating?: number;
    status: 'pending' | 'published' | 'rejected';
    createdAt: string;
}

// Rate limiting store (in-memory for V1)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 3; // max submissions
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour in ms

// Data file path
const DATA_FILE = path.join(process.cwd(), 'data', 'feedback.json');

// Helper: Read feedback data
async function readFeedback(): Promise<Feedback[]> {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}

// Helper: Write feedback data
async function writeFeedback(feedback: Feedback[]): Promise<void> {
    await fs.writeFile(DATA_FILE, JSON.stringify(feedback, null, 2));
}

// Helper: Check rate limit
function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const record = rateLimitMap.get(ip);

    if (!record || now > record.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
        return true;
    }

    if (record.count >= RATE_LIMIT) {
        return false;
    }

    record.count++;
    return true;
}

// Helper: Sanitize text (basic XSS prevention)
function sanitize(text: string): string {
    return text
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;');
}

// GET: Return published feedback only
export async function GET() {
    try {
        const feedback = await readFeedback();
        const published = feedback
            .filter(f => f.status === 'published')
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        // Strip private email from public response
        const publicFeedback = published.map(({ email, ...rest }) => rest);

        return NextResponse.json(publicFeedback);
    } catch (error) {
        console.error('Feedback GET error:', error);
        return NextResponse.json({ error: 'Failed to fetch feedback' }, { status: 500 });
    }
}

// POST: Submit new feedback
export async function POST(req: Request) {
    try {
        // Get IP for rate limiting
        const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';

        // Rate limit check
        if (!checkRateLimit(ip)) {
            return NextResponse.json(
                { error: 'Too many submissions. Please try again later.' },
                { status: 429 }
            );
        }

        const body = await req.json();
        const { name, email, message, context, rating, honeypot } = body;

        // Honeypot check (spam bot detection)
        if (honeypot) {
            // Silently accept but don't save (trick spam bots)
            return NextResponse.json({ success: true, message: 'Thank you for your feedback!' });
        }

        // Validation
        if (!name || typeof name !== 'string' || name.length < 2 || name.length > 100) {
            return NextResponse.json({ error: 'Valid name is required (2-100 chars)' }, { status: 400 });
        }

        if (!email || typeof email !== 'string' || !email.includes('@') || email.length > 255) {
            return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
        }

        if (!message || typeof message !== 'string' || message.length < 10 || message.length > 1000) {
            return NextResponse.json({ error: 'Message must be 10-1000 characters' }, { status: 400 });
        }

        const validContexts = ['Collaboration', 'Project', 'Consultation', 'General'];
        if (!context || !validContexts.includes(context)) {
            return NextResponse.json({ error: 'Valid context is required' }, { status: 400 });
        }

        if (rating !== undefined && (typeof rating !== 'number' || rating < 1 || rating > 5)) {
            return NextResponse.json({ error: 'Rating must be 1-5' }, { status: 400 });
        }

        // Create new feedback entry
        const newFeedback: Feedback = {
            id: uuidv4(),
            name: sanitize(name.trim()),
            email: email.trim().toLowerCase(),
            message: sanitize(message.trim()),
            context: context as Feedback['context'],
            rating: rating || undefined,
            status: 'pending',
            createdAt: new Date().toISOString()
        };

        // Save to file
        const feedback = await readFeedback();
        feedback.push(newFeedback);
        await writeFeedback(feedback);

        console.log('📝 New feedback received:', { id: newFeedback.id, name: newFeedback.name, context });

        return NextResponse.json({
            success: true,
            message: 'Thank you! Your feedback has been submitted for review.'
        });

    } catch (error) {
        console.error('Feedback POST error:', error);
        return NextResponse.json({ error: 'Failed to submit feedback' }, { status: 500 });
    }
}
