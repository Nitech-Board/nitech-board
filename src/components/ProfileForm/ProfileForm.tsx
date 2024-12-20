import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../provider/AurhProvider";
import Loading from "../Loading/Loading";

const ProfileForm = ({ onSubmit }) => {
  const user = useAuth();
  const [nickname, setNickname] = useState("");
  const [enrollmentYear, setEnrollmentYear] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user === undefined) return;
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
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
      <div style={{ marginBottom: "10px" }}>
        <label>
          ニックネーム：
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
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
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            placeholder="例: 2022"
          />
        </label>
      </div>
      <button
        disabled={isButtonDisabled}
        type="submit"
        style={{ padding: "10px 20px", cursor: "pointer" }}
      >
        登録
      </button>
    </form>
  );
};

export default ProfileForm;
