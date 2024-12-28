"use client";
import { APPLICATION_NAME } from "@/utils/const";
import styles from "./Header.module.css";
import { useAuth } from "../provider/AuthProvider";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { auth } from "@/lib/FirebaseConfig";

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

  const onButtonClick = () => {
    if (!user) return;
    // logout
    Swal.fire({
      title: "ログアウトしますか？",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "ログアウト",
      cancelButtonText: "キャンセル",
    }).then((result) => {
      if (result.isConfirmed) {
        auth.signOut().then(() => {
          Swal.fire({
            title: "ログアウトしました",
            icon: "success",
          }).then(() => {
            location.reload();
          });
        });
      }
    });
  };

  return (
    <header className={styles.header}>
      <div style={{ width: "fit-content" }}>
        <a href="/">
          <h1 className={`${styles.delaGothicOneRegular} ${styles.titleFont}`}>
            {APPLICATION_NAME}
          </h1>
        </a>
      </div>
      <button onClick={onButtonClick} className={styles.loginState}>
        {loginState}
      </button>
    </header>
  );
}
