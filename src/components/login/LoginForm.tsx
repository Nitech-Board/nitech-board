import React from "react";

interface LoginFormProps {
  email: string;
  password: string;
  showPassword: boolean;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  togglePasswordVisibility: () => void;
  onLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  showPassword,
  setEmail,
  setPassword,
  togglePasswordVisibility,
  onLogin,
}) => {
  return (
    <div>
      <p>メールアドレスとパスワードを入力してください</p>

      {/* メールアドレス入力 */}
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* パスワード入力 */}
      <div>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={togglePasswordVisibility}>
          {showPassword ? "隠す" : "表示"}
        </button>
      </div>

      {/* ログインボタン */}
      <button onClick={onLogin}>ログイン</button>
    </div>
  );
};

export default LoginForm;
