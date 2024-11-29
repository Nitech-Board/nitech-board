"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "../../components/login/LoginForm";

export default function LoginPage() {
  // 状態管理
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const router = useRouter();

  // ログインボタンが押されたとき
  const handleLogin = () => {
    router.push("/search");
  };

  return (
    <div>
      <h2>ログインページ</h2>
      <LoginForm
        email={email}
        password={password}
        showPassword={showPassword}
        setEmail={setEmail}
        setPassword={setPassword}
        togglePasswordVisibility={() => setShowPassword(!showPassword)}
        onLogin={handleLogin}
      />
    </div>
  );
}
