import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firestoreAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET: Return ALL feedback (admin only)
export async function GET(req: NextRequest) {
    // Check admin secret
    const adminSecret = req.headers.get("x-admin-secret");
    if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const snap = await db.collection("feedback").orderBy("createdAt", "desc").limit(200).get();
    const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

    return NextResponse.json(items);
}
