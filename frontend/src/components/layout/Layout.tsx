import React, { ReactNode } from "react";
import Header from "./Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="w-full mt-20">{children}</main>
    </>
  );
}
