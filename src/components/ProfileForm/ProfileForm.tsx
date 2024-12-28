import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Button } from "@mui/material";
import styles from "./ProfileForm.module.css";
import Loading from "../Loading/Loading";
import { useAuth } from "../provider/AuthProvider";

const ProfileForm = ({ onSubmit }) => {
  const user = useAuth();
  const [nickname, setNickname] = useState<string>("");
  const [enrollmentYear, setEnrollmentYear] = useState<string>("");
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [isLoading, setIsloading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      const token = await user.getIdToken();
      // プロフィール情報を取得
      fetch("/api/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            res.json().then((data) => {
              setNickname(data.name);
              setEnrollmentYear(data.enrollmentYear);
            });
          } else {
            throw new Error("Failed to fetch profile");
          }
        })
        .finally(() => {
          setIsloading(false);
        });
    };

    fetchProfile();
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsButtonDisabled(true);
    if (!nickname || !enrollmentYear) {
      Swal.fire("エラー", "全ての項目を入力してください。", "error");
      return;
    }
    onSubmit({ nickname, enrollmentYear }).then(() => {
      setIsButtonDisabled(false);
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div style={{ marginBottom: "10px" }}>
        <label>
          ニックネーム：
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            style={{ width: "95%", padding: "8px", marginTop: "5px" }}
            placeholder="例: 山田太郎"
          />
        </label>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>
          入学年度（半角入力）:
          <input
            type="number"
            value={enrollmentYear}
            onChange={(e) => setEnrollmentYear(e.target.value)}
            style={{ width: "95%", padding: "8px", marginTop: "5px" }}
            placeholder="例: 2022"
          />
        </label>
      </div>
      <div className={styles.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={styles.submitButton}
          disabled={isButtonDisabled}
        >
          登録
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
