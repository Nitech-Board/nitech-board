import { NextRequest } from "next/server";
import { auth } from "firebase-admin";
import { cert, getApps, initializeApp } from "firebase-admin/app";

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
    }),
  });
}

export default async function getFirebaseUid(
  req: NextRequest
): Promise<string | null> {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return null;
  }

  const token = authHeader.replace("Bearer ", "");

  // verify token
  const uid = await auth()
    .verifyIdToken(token)
    .then((decodedToken) => decodedToken.uid)
    .catch(() => null);

  return uid;
}
