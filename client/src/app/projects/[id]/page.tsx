"use client";
import React, { useState } from "react";
import ProjectHeader from "../project-header";
import Board from "../BoardView";
import ListView from "../ListView";
import Timeline from "../Timeline";
import TableView from "../TableView";
import { Button } from "@/components/ui/button";
import { CreateTaskDialog } from "@/components/custom/create-task-dialog";

type Props = {
  params: Promise<{ id: string }>;
};

const Project = ({ params }: Props) => {
  const { id } = React.use(params);
  const [activeTab, setActiveTab] = useState("Board");

  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);
  const [addTaskDiaglopOpen, setAddTaskDialogOpen] = useState(false);

  return (
    <div>
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex items-center justify-end px-6 pt-4">
        <CreateTaskDialog
          projectId={id}
          open={addTaskDiaglopOpen}
          setOpen={setAddTaskDialogOpen}
        />
      </div>

      {activeTab === "Board" && (
        <Board id={id} setIsModalNewOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "List" && (
        <ListView id={id} setIsModalNewOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "Timeline" && (
        <Timeline id={id} setIsModalNewOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "Table" && (
        <TableView id={id} setIsModalNewOpen={setIsModalNewTaskOpen} />
      )}
    </div>
  );
};

export default Project;
