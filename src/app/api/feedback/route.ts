import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firestoreAdmin";
import { FieldValue } from "firebase-admin/firestore";

// firebase-admin needs Node runtime + no build-time static prerender
// (no GCP credentials exist during the Docker build → would break the build)
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET: Return published feedback (public)
export async function GET() {
    try {
        // Fetch all recent feedback, filter client-side (no index needed)
        const snap = await db
            .collection("feedback")
            .orderBy("createdAt", "desc")
            .limit(200)
            .get();

        const items = snap.docs
            .filter(d => d.data().status === "published")
            .slice(0, 50)
            .map((d) => {
                const data = d.data();
                // Strip email from public response
                const { email, ...publicData } = data;
                return { id: d.id, ...publicData };
            });

        return NextResponse.json(items);
    } catch (error) {
        console.error("Feedback GET error:", error);
        // Return empty list so the page still renders if Firestore is unavailable
        return NextResponse.json([]);
    }
}

// POST: Submit new feedback (public)
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Honeypot: silently accept bots without storing
        if (body?.honeypot) {
            return NextResponse.json({ success: true });
        }

        if (!body?.message || body.message.length < 3) {
            return NextResponse.json({ error: "Invalid message" }, { status: 400 });
        }

        const doc = await db.collection("feedback").add({
            name: body.name || "Anonymous",
            email: body.email || null,
            message: body.message,
            rating: body.rating || null,
            context: body.context || "General",
            status: "published",
            createdAt: FieldValue.serverTimestamp(),
        });

        console.log(`📝 New feedback submitted: ${doc.id}`);

        return NextResponse.json({
            success: true,
            id: doc.id,
            message: "Thank you! Your feedback has been published."
        });
    } catch (error) {
        console.error("Feedback POST error:", error);
        return NextResponse.json(
            { error: "Failed to save feedback. Please try again later." },
            { status: 500 }
        );
    }
}
