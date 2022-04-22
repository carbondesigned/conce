import React from "react";
import { Navbar } from "./Navbar";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <Navbar />
      <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
        {children}
      </main>
    </div>
  );
};
