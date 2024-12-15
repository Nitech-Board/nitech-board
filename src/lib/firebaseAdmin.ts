import { initializeApp } from "firebase-admin";
import serviceAccount from "@/serviceAcountKey.json";

const app = initializeApp({
  credential: initializeApp.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});
