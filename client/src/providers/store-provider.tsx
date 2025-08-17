"use client";
import StoreProvider from "@/store";
import React from "react";

const StoreP = ({ children }: { children: React.ReactNode }) => {
  return <StoreProvider>{children}</StoreProvider>;
};

export default StoreP;
