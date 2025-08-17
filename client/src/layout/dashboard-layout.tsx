"use client";
import Navbar from "@/components/custom/Navbar";
import { AppSidebar } from "@/components/custom/Sidebar";
import { useAppSelector } from "@/store";
import React, { useEffect } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
      <AppSidebar />
      <main className={`flex w-full flex-col bg-gray-50 dark:bg-dark-bg `}>
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
