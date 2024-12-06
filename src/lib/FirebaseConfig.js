import { initializeApp, getApps } from "firebase/app";
// Firestoreはログインやユーザー登録の実装には使わないが、今後のことを考えて入れておく
import { getFirestore } from 'firebase/firestore'
import {
  getAuth,
} from "firebase/auth";

// .envファイルで設定した環境変数をfirebaseConfigに入れる
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID
};


let firebaseApp = initializeApp(firebaseConfig);
let firestore = getFirestore;

// サーバーサイドでレンダリングするときにエラーが起きないようにするための記述
// 意味わからない
if (typeof window !== "undefined" && !getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
  firestore = getFirestore();
}

export const auth = getAuth(firebaseApp);
export { firebaseApp, firestore };
