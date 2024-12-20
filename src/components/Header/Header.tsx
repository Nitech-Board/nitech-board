import { APPLICATION_NAME } from "@/utils/const";
import styles from "./Header.module.css";

// aタグのリンクが横に長くなるのを防ぐために、divで囲んでいる
export default function Header() {
  return (
    <header className={styles.header}>
      <div style={{ width: "fit-content" }}>
        <a href="/">
          <h1 className={`${styles.delaGothicOneRegular} ${styles.titleFont}`}>
            {APPLICATION_NAME}
          </h1>
        </a>
      </div>
    </header>
  );
}
