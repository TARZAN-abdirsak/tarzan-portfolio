import "server-only";
import { getApps, initializeApp, cert, applicationDefault, type App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

/**
 * Initialises the Firebase Admin app.
 *
 * - Vercel / any host WITHOUT Application Default Credentials:
 *   set FIREBASE_SERVICE_ACCOUNT_KEY to the service-account JSON
 *   (raw JSON, or base64-encoded to avoid newline issues).
 * - Cloud Run / GCP: credentials are provided automatically (ADC),
 *   so just GOOGLE_CLOUD_PROJECT is enough.
 */
function initApp(): App {
    if (getApps().length) return getApps()[0];

    const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

    if (raw) {
        const json = raw.trim().startsWith("{")
            ? raw
            : Buffer.from(raw, "base64").toString("utf8");
        const serviceAccount = JSON.parse(json);

        return initializeApp({
            credential: cert(serviceAccount),
            projectId: serviceAccount.project_id,
        });
    }

    // Fallback: Application Default Credentials (Cloud Run / GCP).
    // Credentials resolve lazily on first request, so this never throws at import.
    return initializeApp({
        credential: applicationDefault(),
        projectId: process.env.GOOGLE_CLOUD_PROJECT,
    });
}

export const db = getFirestore(initApp());
