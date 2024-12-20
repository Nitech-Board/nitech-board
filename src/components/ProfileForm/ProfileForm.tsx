import React, { useState } from "react";
import Swal from "sweetalert2";

const ProfileForm = ({ onSubmit }) => {
  const [nickname, setNickname] = useState("");
  const [enrollmentYear, setEnrollmentYear] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nickname || !enrollmentYear) {
      Swal.fire("エラー", "全ての項目を入力してください。", "error");
      return;
    }
    onSubmit({ nickname, enrollmentYear });
    setNickname("");
    setEnrollmentYear("");
  };

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
      <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
        登録
      </button>
    </form>
  );
};

export default ProfileForm;
