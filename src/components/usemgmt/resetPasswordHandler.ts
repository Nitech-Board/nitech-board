import { auth } from "@/lib/FirebaseConfig";
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import Swal from "sweetalert2";

// パスワードのリセットを行う
// メールに届いたパスワードリセットのリンクをクリックしたときに呼ばれる
export default async function handleResetPassword(code: string) {
  try {
    // firebaseのAPIで、コードが有効か確認する
    const accountEmail = await verifyPasswordResetCode(auth, code);

    // パスワードの入力
    const { value: newPassword } = await Swal.fire({
      title: "Enter your password",
      text: `Please enter a new password for ${accountEmail}`,
      input: "password",
      inputLabel: "Password",
      inputPlaceholder: "Enter your password",
      inputAttributes: {
        maxlength: "20",
        autocapitalize: "off",
        autocorrect: "off",
      },
    });

    try {
      // 入力したパスワードを新しいパスワードとして設定する
      const resp = await confirmPasswordReset(auth, code, newPassword);
      console.log(resp);
      Swal.fire({
        icon: "success",
        title: "成功",
        text: "パスワードのリセットが完了しました。",
      });
    } catch (e: any) {
      Swal.fire({
        icon: "error",
        title: "エラー",
        text: `${e?.message ?? "パスワードのリセットに失敗しました。"}`,
      });
    }
  } catch {
    // Invalid or expired action code. Ask user to try to reset the password
    // again.
    Swal.fire({
      icon: "error",
      title: "エラー",
      text: `パスワードのリセットに失敗しました。再度お試しください。`,
    });
  }
}
