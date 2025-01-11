"use client";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { firebaseApp } from "../../lib/FirebaseConfig";
import { ALLOWED_DOMAIN } from "@/utils/const";
import styles from "./page.module.css";
import { Box, Typography, Button, TextField } from "@mui/material";
import Swal from "sweetalert2";

export default function Register() {
  // useStateでユーザーが入力したメールアドレスとパスワードをemailとpasswordに格納する
  const [studentNumber, setStudentNumber] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  // FirebaseAppを利用して認証を取得
  const auth = getAuth(firebaseApp);

  // ユーザーが登録ボタンを押したときにdoRegister関数が実行される
  const doRegister = async () => {
    try {
      const email = studentNumber + ALLOWED_DOMAIN;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // 確認メールを送信
      await sendEmailVerification(user);

      Swal.fire({
        icon: "success",
        title: "仮登録（まだ登録は完了していません）",
        text: `確認メールを送信しました。メールを確認して登録を完了してください。`,
      });
      router.push("/login");
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "エラー",
        text: `登録に失敗しました。`,
      });
    }
  };

  return (
    <Box className={styles.container}>
      <Typography variant="h4" className={styles.title}>
        新規登録
      </Typography>
      <Box component="form" className={styles.form}>
        <TextField
          label="学籍番号"
          type="text"
          value={studentNumber}
          placeholder={ALLOWED_DOMAIN}
          onChange={(e) => setStudentNumber(e.target.value)}
          fullWidth
          required
          className={styles.input}
        />
        <TextField
          label="パスワード"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
          className={styles.input}
        />
        <Button
          variant="contained"
          color="primary"
          // 登録ボタンがクリックされたときdoRegister関数が実行されるようにする
          onClick={() => {
            doRegister();
          }}
          fullWidth
          size="large"
          className={styles.button}
        >
          登録
        </Button>
      </Box>
    </Box>
  );
}
