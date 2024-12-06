"use client";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// Firebaseの初期化を行うためfirebaseAppをインポート
import { firebaseApp } from "../../lib/FirebaseConfig";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "../../components/login/LoginForm";

export default function LoginPage() {
  // 状態管理
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const router = useRouter();

  // FirebaseAppを利用して認証を取得
  const auth = getAuth(firebaseApp);
  // ログインボタンが押されたとき
  const doLogin = () => {
    //const auth = getAuth();

    // Firebaseで用意されているメールアドレスとパスワードでログインするための関数
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // ログインができたかどうかをわかりやすくするためのアラート
        alert("ログインOK!");
        console.log(user);
        router.push("/search");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2>ログインページ</h2>
      <LoginForm
        email={email}
        password={password}
        showPassword={showPassword}
        setEmail={setEmail}
        setPassword={setPassword}
        togglePasswordVisibility={() => setShowPassword(!showPassword)}
        onLogin={doLogin}
      />
    </div>
  );
}
