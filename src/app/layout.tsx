import Header from "../components/Header/Header";
import type { Metadata } from "next";
import "../styles/global.css";
import "@/lib/FirebaseConfig";
import { APPLICATION_NAME } from "@/utils/const";
import { AuthProvider } from "@/components/provider/AurhProvider";

export const metadata: Metadata = {
  title: APPLICATION_NAME,
  description: "名古屋工業大学の講義情報を共有するためのWebアプリケーション",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <AuthProvider>
        <body>
          <Header />
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
