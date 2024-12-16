"use client";
import handleResetPassword from "@/components/usemgmt/resetPasswordHandler";
import { handleVerifyEmail } from "@/components/usemgmt/verifyEmailHandler";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

// メールに届いたリンクをクリックしたときに呼ばれるページ
// メールアドレスの確認、パスワードのリセットなどを行う
// ex) https://nitech-board.vercel.app/auth?mode=verifyEmail&oobCode=xxxxxx
function AuthPage() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode"); // resetPassword, recoverEmail, verifyEmailのいずれか
  const oobCode = searchParams.get("oobCode"); // firebaseが生成したコード

  useEffect(() => {
    if (!mode || !oobCode) return;
    switch (mode) {
      case "resetPassword":
        handleResetPassword(oobCode);
        break;
      case "recoverEmail":
        // TODO: 未実装
        // Recover email
        break;
      case "verifyEmail":
        handleVerifyEmail(oobCode);
        break;
    }
  }, [mode, oobCode]);

  return <div />;
}

// Suspenseを使ってページをラップする
// searchParamsを使うために必要
export default function SuspenseAuthPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthPage />
    </Suspense>
  );
}
