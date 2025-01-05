"use client";
import { APPLICATION_NAME } from "@/utils/const";
import styles from "./Header.module.css";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Drawer } from "@mui/material";
import HeaderMenu from "./Menu/HeaderMenu";
import { usePathname } from "next/navigation";

// aタグのリンクが横に長くなるのを防ぐために、divで囲んでいる
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const onButtonClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // /loginページではメニューを表示しない
  if (pathname === "/login" || pathname === "/register") {
    return (
      <header className={styles.header}>
        <div style={{ width: "fit-content" }}>
          <a href="/">
            <h1
              className={`${styles.delaGothicOneRegular} ${styles.titleFont}`}
            >
              {APPLICATION_NAME}
            </h1>
          </a>
        </div>
      </header>
    );
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

      <button onClick={onButtonClick} className={styles.menuIcon}>
        <GiHamburgerMenu size={24} />
      </button>
      <Drawer
        anchor="right"
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      >
        <HeaderMenu closeMenu={() => setIsMenuOpen(false)} />
      </Drawer>
    </header>
  );
}
