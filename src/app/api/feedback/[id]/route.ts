import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import type { Feedback } from '../route';

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

// PATCH: Update feedback status (admin only)
export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Check admin secret
        const adminSecret = req.headers.get('x-admin-secret');
        if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        
        const { id } = await params;
        const body = await req.json();
        const { status } = body;
        
        // Validate status
        const validStatuses = ['pending', 'published', 'rejected'];
        if (!status || !validStatuses.includes(status)) {
            return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
        }
        
        // Update feedback
        const feedback = await readFeedback();
        const index = feedback.findIndex(f => f.id === id);
        
        if (index === -1) {
            return NextResponse.json({ error: 'Feedback not found' }, { status: 404 });
        }
        
        feedback[index].status = status;
        await writeFeedback(feedback);
        
        console.log(`📝 Feedback ${id} status updated to: ${status}`);
        
        return NextResponse.json({ success: true, feedback: feedback[index] });
        
    } catch (error) {
        console.error('Feedback PATCH error:', error);
        return NextResponse.json({ error: 'Failed to update feedback' }, { status: 500 });
    }
}

// DELETE: Remove feedback (admin only)
export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Check admin secret
        const adminSecret = req.headers.get('x-admin-secret');
        if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        
        const { id } = await params;
        
        // Remove feedback
        const feedback = await readFeedback();
        const filtered = feedback.filter(f => f.id !== id);
        
        if (filtered.length === feedback.length) {
            return NextResponse.json({ error: 'Feedback not found' }, { status: 404 });
        }
        
        await writeFeedback(filtered);
        
        console.log(`🗑️ Feedback ${id} deleted`);
        
        return NextResponse.json({ success: true });
        
    } catch (error) {
        console.error('Feedback DELETE error:', error);
        return NextResponse.json({ error: 'Failed to delete feedback' }, { status: 500 });
    }
}
