import React from "react";
import ResuablePriorityPage from "../resuable-priority-page";
import { Priority } from "@/generated/prisma";

const Medium = () => {
  return <ResuablePriorityPage priority={Priority.Medium} />;
};

export default Medium;
