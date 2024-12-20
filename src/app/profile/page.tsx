"use client";

import React from "react";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import Swal from "sweetalert2";

const ProfilePage = () => {
  const handleFormSubmit = (profileData) => {
    const { nickname, enrollmentYear } = profileData;

    // 入学年度のバリデーション
    if (enrollmentYear < 2000 || enrollmentYear > 2024) {
      Swal.fire(
        "エラー",
        "入学年度は2000年から2024年の間で入力してください。",
        "error"
      );
      return;
    }

    // SweetAlertで成功アラートを表示
    Swal.fire({
      title: "プロフィール登録完了",
      text: `ニックネーム: ${nickname}\n入学年度: ${enrollmentYear}`,
      icon: "success",
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>プロフィール登録</h1>
      <ProfileForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default ProfilePage;
