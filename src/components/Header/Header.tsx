import styles from "./Header.module.css";

// aタグのリンクが横に長くなるのを防ぐために、divで囲んでいる
export default function Header() {
  return (
    <header className={styles.header}>
      <div style={{ width: "fit-content" }}>
        <a href="/">
          <h1 className={`${styles.delaGothicOneRegular} ${styles.titleFont}`}>
            Nitech Board
          </h1>
        </a>
      </div>
    </header>
  );
}
