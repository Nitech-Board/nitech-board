"use client";

import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
// Firebaseの初期化を行うためfirebaseAppをインポート
import { firebaseApp } from "../../lib/FirebaseConfig";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "../../components/login/LoginForm";
import styles from "./page.module.css";
import { Box, Typography, Button, Alert } from "@mui/material";
import { ALLOWED_DOMAIN } from "@/utils/const";

//import { auth } from "@/lib/FirebaseConfig";

export default function LoginPage() {
  // 状態管理
  const [studentNumber, setstudentNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(""); // エラーメッセージの状態管理

  const router = useRouter();

  // FirebaseAppを利用して認証を取得
  const auth = getAuth(firebaseApp);
  // ログインボタンが押されたとき
  const doLogin = () => {
    // Firebaseで用意されているメールアドレスとパスワードでログインするための関数
    const email = studentNumber + ALLOWED_DOMAIN;
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

        // ログインできた時
        router.push("/search");
      })
      .catch((error) => {
        // エラーメッセージのセット（代入）
        if (
          error.code === "auth/invalid-credential" ||
          error.code === "auth/invalid-email"
        ) {
          setErrorMessage("メールアドレスまたはパスワードが正しくありません。");
        } else {
          setErrorMessage("ログインに失敗しました。");
        }
        console.log(error);
      });
  };

  return (
    <Box className={styles.container}>
      <Typography variant="h4" className={styles.title}>
        ログイン
      </Typography>
      <LoginForm
        studentNumber={studentNumber}
        password={password}
        showPassword={showPassword}
        setEmail={setstudentNumber}
        setPassword={setPassword}
        togglePasswordVisibility={() => setShowPassword(!showPassword)}
        onLogin={doLogin}
      />
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <Typography className={styles.registerLink}>
        ユーザー登録がまだの方は
        <Button href="/register" color="primary">
          こちら
        </Button>
      </Typography>
    </Box>
  );
}
