"use client";
import { useAuth } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// ログインしているか判別し、していない場合はログインページにリダイレクトを促すモーダルを表示する
export default function AuthRedirect({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = useAuth();
  const router = useRouter();

  useEffect(() => {
    const currentPath = window.location.pathname;
    if (
      user === null &&
      router &&
      currentPath !== "/login" &&
      currentPath !== "/register" &&
      currentPath !== "/usermgmt"
    ) {
      Swal.fire({
        title: "ログインが必要です",
        text: "あなたはログインしていません。下のボタンからログインしてください。",
        icon: "info",
        confirmButtonText: "ログイン",
        allowOutsideClick: false,
        allowEscapeKey: false,
        keydownListenerCapture: true,
      }).then(() => {
        router.push("/login");
      });
    }
  }, [user, router]);

  return children;
}
