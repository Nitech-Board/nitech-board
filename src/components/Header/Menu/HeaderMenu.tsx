import { useAuth } from "@/components/provider/AuthProvider";
import { auth } from "@/lib/FirebaseConfig";
import Swal from "sweetalert2";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import styles from "./HeaderMenu.module.css";
import { useRouter } from "next/navigation";

const MenuButton = ({
  children,
  url,
  closeMenu,
}: {
  children: string;
  url: string;
  closeMenu: () => void;
}) => {
  const router = useRouter();
  const onClick = () => {
    closeMenu();
    router.push(url);
  };

  return (
    <button onClick={onClick} className={styles.menuButton}>
      <MdOutlineKeyboardArrowRight />
      {children}
    </button>
  );
};

export default function HeaderMenu({ closeMenu }: { closeMenu: () => void }) {
  const user = useAuth();

  const onButtonClick = () => {
    if (!user) return;
    closeMenu();
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
    <div style={{ width: "200px", height: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <MenuButton closeMenu={closeMenu} url="/search">
          検索
        </MenuButton>
        <MenuButton closeMenu={closeMenu} url="/profile">
          プロフィール設定
        </MenuButton>
        <button className={styles.menuButton} onClick={onButtonClick}>
          <MdOutlineKeyboardArrowRight />
          ログアウト
        </button>
      </div>
    </div>
  );
}
