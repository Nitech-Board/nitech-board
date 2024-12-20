"use client";
import { APPLICATION_NAME } from "@/utils/const";
import styles from "./Header.module.css";
import { useAuth } from "../provider/AuthProvider";
import { useEffect, useState } from "react";

// aタグのリンクが横に長くなるのを防ぐために、divで囲んでいる
export default function Header() {
  const user = useAuth();
  const [loginState, setLoginState] = useState("ログインしていません");

  useEffect(() => {
    if (user) {
      setLoginState("ログイン中");
    } else {
      setLoginState("ログインしていません");
    }
  }, [user]);

  return (
    <header className={styles.header}>
      <div style={{ width: "fit-content" }}>
        <a href="/">
          <h1 className={`${styles.delaGothicOneRegular} ${styles.titleFont}`}>
            {APPLICATION_NAME}
          </h1>
        </a>
      </div>
      <div style={{ alignItems: "right" }}>{loginState}</div>
    </header>
  );
}
