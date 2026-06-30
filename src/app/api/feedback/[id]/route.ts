import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firestoreAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// PATCH: Update feedback status (admin only)
export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const adminSecret = req.headers.get("x-admin-secret");
    if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { status } = body;

    const validStatuses = ["pending", "published", "rejected"];
    if (!status || !validStatuses.includes(status)) {
        return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const ref = db.collection("feedback").doc(id);
    const doc = await ref.get();
    if (!doc.exists) {
        return NextResponse.json({ error: "Feedback not found" }, { status: 404 });
    }

    await ref.update({ status });
    console.log(`📝 Feedback ${id} status updated to: ${status}`);

    return NextResponse.json({ success: true, feedback: { id, ...doc.data(), status } });
}

// DELETE: Remove feedback (admin only)
export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const adminSecret = req.headers.get("x-admin-secret");
    if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const ref = db.collection("feedback").doc(id);
    const doc = await ref.get();

    if (!doc.exists) {
        return NextResponse.json({ error: "Feedback not found" }, { status: 404 });
    }

    await ref.delete();
    console.log(`🗑️ Feedback ${id} deleted`);

    return NextResponse.json({ success: true });
}
