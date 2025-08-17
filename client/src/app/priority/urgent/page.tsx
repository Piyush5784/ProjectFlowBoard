import React from "react";
import ResuablePriorityPage from "../resuable-priority-page";
import { Priority } from "@/generated/prisma";

const Urgent = () => {
  return <ResuablePriorityPage priority={Priority.Urgent} />;
};

export default Urgent;
