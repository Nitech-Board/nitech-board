import { auth } from "@/lib/FirebaseConfig";
import { applyActionCode } from "firebase/auth";
import Swal from "sweetalert2";

// メールアドレスの認証を行う
// メールに届いたメールアドレス確認のリンクをクリックしたときに呼ばれる
export async function handleVerifyEmail(code: string, router: any) {
  // メールアドレスの認証を行うかどうかの確認
  const result = await Swal.fire({
    title: "メールアドレスを認証",
    text: "このメールアドレスを認証しますか？",
    icon: "warning",
    showCancelButton: true,
  }).then((result) => {
    return result.isConfirmed;
  });

  // メールアドレスの認証
  if (result) {
    try {
      await applyActionCode(auth, code); // firebaseの機能でメールアドレスを認証
      await Swal.fire(
        "メールアドレス認証完了",
        "メールアドレスを認証しました",
        "success"
      );
    } catch {
      await Swal.fire(
        "エラー",
        "メールアドレスの認証に失敗しました。",
        "error"
      );
    } finally {
      router.push("/login");
    }
  }
}
