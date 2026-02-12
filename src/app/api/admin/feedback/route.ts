import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import type { Feedback } from '../../feedback/route';

// Data file path
const DATA_FILE = path.join(process.cwd(), 'data', 'feedback.json');

// GET: Return ALL feedback (admin only)
export async function GET(req: Request) {
    try {
        // Check admin secret
        const adminSecret = req.headers.get('x-admin-secret');
        if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = await fs.readFile(DATA_FILE, 'utf-8');
        const feedback: Feedback[] = JSON.parse(data);

        // Sort by date, newest first
        feedback.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        return NextResponse.json(feedback);
    } catch (error) {
        console.error('Admin feedback GET error:', error);
        return NextResponse.json({ error: 'Failed to fetch feedback' }, { status: 500 });
    }
}
