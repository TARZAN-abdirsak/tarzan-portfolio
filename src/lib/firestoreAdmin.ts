import "server-only";
import { getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const app = getApps().length
    ? getApps()[0]
    : initializeApp({
        projectId: process.env.GOOGLE_CLOUD_PROJECT,
    });

export const db = getFirestore(app);
