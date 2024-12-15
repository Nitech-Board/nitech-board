import { auth } from "@/lib/FirebaseConfig";
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import Swal from "sweetalert2";

export default async function handleResetPassword(code: string) {
  try {
    // Verify the password reset code is valid.
    const accountEmail = await verifyPasswordResetCode(auth, code);

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

    // Save the new password.
    try {
      const resp = await confirmPasswordReset(auth, code, newPassword);
      console.log(resp);
      Swal.fire({
        icon: "success",
        title: "成功",
        text: "パスワードのリセットが完了しました。",
      });
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "エラー",
        text: `${e.message}`,
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
