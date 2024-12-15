import { auth } from "@/lib/FirebaseConfig";
import { applyActionCode } from "firebase/auth";
import Swal from "sweetalert2";

export default async function handleVerifyEmail(code: string) {
  // メールアドレスの認証を行うかどうかの確認
  const result = await Swal.fire({
    title: "メールアドレスを認証",
    text: "このメールアドレスを認証しますか？",
    icon: "warning",
    showCancelButton: true,
  });

  // メールアドレスの認証
  if (result.isConfirmed) {
    try {
      await applyActionCode(auth, code); // firebaseの機能でメールアドレスを認証
    } catch {
      Swal.fire("エラー", "メールアドレスの認証に失敗しました。", "error");
    }
    Swal.fire(
      "メールアドレス認証完了",
      "メールアドレスを認証しました",
      "success"
    );
  }
}
