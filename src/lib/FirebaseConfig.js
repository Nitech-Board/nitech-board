import { initializeApp, getApps } from "firebase/app";
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

// サーバーサイドでレンダリングするときにエラーが起きないようにするための記述
// 意味わからない
if (typeof window !== "undefined" && !getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
}

export const auth = getAuth(firebaseApp);
export { firebaseApp };
