"use client";

import React from "react";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import Swal from "sweetalert2";
import { useAuth } from "@/components/provider/AuthProvider";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const user = useAuth();
  const router = useRouter();

  const handleFormSubmit = async (profileData) => {
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

    const token = await user.getIdToken();

    // プロフィール情報を送信
    const res = await fetch("/api/profile", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    });
    if (res.ok) {
      // SweetAlertで成功アラートを表示
      Swal.fire({
        title: "プロフィール登録完了",
        html: `ニックネーム: <b>${nickname}</b> <br> 入学年度: <b>${enrollmentYear}</b>`,
        icon: "success",
      }).then(() => {
        router.push("/search");
      });
    } else {
      console.log(token);
      Swal.fire("エラー", "プロフィール登録に失敗しました。", "error");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>プロフィール設定</h1>
      <ProfileForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default ProfilePage;
