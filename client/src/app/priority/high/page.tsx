import React from "react";
import ResuablePriorityPage from "../resuable-priority-page";
import { Priority } from "@/generated/prisma";

const High = () => {
  return <ResuablePriorityPage priority={Priority.High} />;
};

export default High;
