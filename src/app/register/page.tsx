"use client";
//import styles from "../../styles/Home.module.css";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
// 現時点で使わないものもあるが今後のことを考えて入れておく
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { firebaseApp } from "../../lib/FirebaseConfig";

export default function Register() {
  // useStateでユーザーが入力したメールアドレスとパスワードをemailとpasswordに格納する
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const allowedDomain = "@stn.nitech.ac.jp";

  const router = useRouter();

  // FirebaseAppを利用して認証を取得
  const auth = getAuth(firebaseApp);

  // ユーザーが登録ボタンを押したときにdoRegister関数が実行される
  const doRegister = async () => {
    // メールアドレスのドメインを制限
    if (!email.endsWith(allowedDomain)) {
      alert(`メールアドレスは ${allowedDomain} のみ使用できます。`);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // 確認メールを送信
      await sendEmailVerification(user);

      alert(
        "確認メールを送信しました。メールを確認して登録を完了してください。"
      );
      router.push("/login");
    } catch (error) {
      console.error(error);
      alert("登録に失敗しました。");
    }
  };

  return (
    <div>
      <h1>新規登録</h1>
      <div>
        <Form>
          <p>メールアドレスは{allowedDomain}で終わるものを使ってください。</p>
          <FormGroup>
            <Label>メールアドレス：</Label>
            <Input
              type="email"
              name="email"
              style={{ height: 50, fontSize: "1.2rem" }}
              placeholder={allowedDomain}
              // onChangeでユーザーが入力した値を取得し、その値をemailに入れる
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>パスワード：</Label>
            <Input
              type="password"
              name="password"
              style={{ height: 50, fontSize: "1.2rem" }}
              // onChangeでユーザーが入力した値を取得し、その値をpasswordに入れる
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <Button
            style={{ width: 220 }}
            color="primary"
            // 登録ボタンがクリックされたときdoRegister関数が実行されるようにする
            onClick={() => {
              doRegister();
            }}
          >
            登録
          </Button>
        </Form>
      </div>
    </div>
  );
}
