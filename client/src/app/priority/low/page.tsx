import React from "react";
import ResuablePriorityPage from "../resuable-priority-page";
import { Priority } from "@/generated/prisma";

const Low = () => {
  return <ResuablePriorityPage priority={Priority.Low} />;
};

export default Low;
