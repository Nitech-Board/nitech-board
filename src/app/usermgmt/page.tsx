"use client";
import handleResetPassword from "@/components/usemgmt/resetPasswordHandler";
import handleVerifyEmail from "@/components/usemgmt/verifyEmailHandler";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function AuthPage() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const oobCode = searchParams.get("oobCode");

  useEffect(() => {
    if (!mode || !oobCode) return;
    switch (mode) {
      case "resetPassword":
        handleResetPassword(oobCode);
        break;
      case "recoverEmail":
        // Recover email
        break;
      case "verifyEmail":
        handleVerifyEmail(oobCode);
        break;
    }
  }, [mode, oobCode]);

  return <div />;
}

export default function SuspenseAuthPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthPage />
    </Suspense>
  );
}
