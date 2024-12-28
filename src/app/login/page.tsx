"use client";

import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
// Firebaseの初期化を行うためfirebaseAppをインポート
import { firebaseApp } from "../../lib/FirebaseConfig";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "../../components/login/LoginForm";
//import { auth } from "@/lib/FirebaseConfig";

export default function LoginPage() {
  // 状態管理
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(""); // エラーメッセージの状態管理

  const router = useRouter();

  // FirebaseAppを利用して認証を取得
  const auth = getAuth(firebaseApp);
  // ログインボタンが押されたとき
  const doLogin = () => {
    // Firebaseで用意されているメールアドレスとパスワードでログインするための関数
    signInWithEmailAndPassword(auth, email, password) //authが悪いのかも？？
      .then((userCredential) => {
        const user = userCredential.user;

        //メアドが確認済みかチェック
        if (!user.emailVerified) {
          setErrorMessage(
            "メールアドレスが未確認です。確認メールをチェックしてください。"
          );
          return; //このreturnで不正アクセスをはじく
        }

        // ログインができたかどうかをわかりやすくするためのアラート
        alert("ログインOK!");
        console.log(user);
        router.push("/search");
      })
      .catch((error) => {
        // エラーメッセージのセット（代入）
        if (
          error.code === "auth/user-not-found" ||
          error.code === "auth/wrong-password"
        ) {
          setErrorMessage("メールアドレスまたはパスワードが正しくありません。");
        } else {
          setErrorMessage("ログインに失敗しました。");
        }
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
      {/* エラーのメッセージの表示 */}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <p>
        ユーザー登録がまだの方は
        <a href="/register">こちら</a>
      </p>
    </div>
  );
}
