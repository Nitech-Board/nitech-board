import Header from "../components/Header/Header";
import type { Metadata } from "next";
import "../styles/global.css";

export const metadata: Metadata = {
  title: "websocket sample",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
