import React, { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { useRouter } from "next/router";

export default function Layout({ children }: { children: ReactNode }) {
  const { route } = useRouter();
  if (route === "/login" || route === "/register") {
    return <>{children}</>;
  }
  return (
    <>
      <Header />
      <main className="w-full min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
