import React, { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="w-full mt-20 py-16 md:py-24">{children}</main>
      <Footer />
    </>
  );
}
