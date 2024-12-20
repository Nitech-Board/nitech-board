import { APPLICATION_NAME } from "@/utils/const";
import styles from "./Header.module.css";
import { useAuth } from "../provider/AuthProvider";

// aタグのリンクが横に長くなるのを防ぐために、divで囲んでいる
export default function Header() {
  const user = useAuth();
  let now_state = "";
  if (user) {
    now_state = "ログイン中";
  } else {
    now_state = "ログインしていません";
  }
  return (
    <header className={styles.header}>
      <div style={{ width: "fit-content" }}>
        <a href="/">
          <h1 className={`${styles.delaGothicOneRegular} ${styles.titleFont}`}>
            {APPLICATION_NAME}
          </h1>
        </a>
      </div>
      <div style={{ alignItems: "right" }}>{now_state}</div>
    </header>
  );
}
