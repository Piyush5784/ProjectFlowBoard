import React from "react";
import ResuablePriorityPage from "../resuable-priority-page";
import { Priority } from "@/generated/prisma";

const Backlog = () => {
  return <ResuablePriorityPage priority={Priority.Backlog} />;
};

export default Backlog;
