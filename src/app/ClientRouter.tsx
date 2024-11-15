//このファイルはBrowserRouterを使うためのものです。
"use client";

import { BrowserRouter } from "react-router-dom";

export default function ClientRouter({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BrowserRouter>{children}</BrowserRouter>;
}
