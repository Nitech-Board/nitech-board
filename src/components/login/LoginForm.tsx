import React from "react";
import { Box, TextField, Button } from "@mui/material";
import styles from "./LoginForm.module.css";

interface LoginFormProps {
  studentNumber: string;
  password: string;
  showPassword: boolean;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  togglePasswordVisibility: () => void;
  onLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  studentNumber,
  password,
  showPassword,
  setEmail,
  setPassword,
  onLogin,
}) => {
  return (
    <Box component="form" className={styles.form}>
      <TextField
        label="学籍番号"
        type="text"
        value={studentNumber}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        required
        className={styles.input}
      />
      <TextField
        label="パスワード"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        required
        className={styles.input}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={onLogin}
        fullWidth
        size="large"
        className={styles.button}
      >
        ログイン
      </Button>
    </Box>
  );
};

export default LoginForm;
