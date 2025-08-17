"use client";
import React, { useMemo, useState } from "react";
import { BoardProps } from "../BoardView";
import { useAppSelector } from "@/store";
import { useGetTasksQuery } from "@/store/state/api";
import { useTheme } from "next-themes";
import { DisplayOption, Gantt, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TaskType } from "gantt-task-react/dist/types/public-types";
import { Button } from "@/components/ui/button";

type TaskTypeItems = "task" | "milestone" | "project";
const Timeline = ({ id, setIsModalNewOpen }: BoardProps) => {
  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTasksQuery({ projectId: Number(id) });

  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-US",
  });

  const ganttTasks = useMemo(() => {
    return (
      tasks?.map((task) => ({
        start: task.startDate ? new Date(task.startDate) : new Date(),
        end: task.dueDate ? new Date(task.dueDate) : new Date(),
        name: task.title,
        id: `Task-${task.id}`,
        type: "task" as TaskTypeItems, // Use 'as const' for literal type
        isDisabled: false,
        progress: task.points ? (task.points / 10) * 100 : 0,
      })) || []
    );
  }, [tasks]);

  // Handle view mode change
  const handleViewModeChange = (newViewMode: ViewMode) => {
    setDisplayOptions((prev) => ({
      ...prev,
      viewMode: newViewMode,
    }));
  };

  if (isLoading) {
    return (
      <div className="text-gray-700 dark:text-gray-200">Loading tasks...</div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 dark:text-red-400">Error loading tasks.</div>
    );
  }

  return (
    <div className="px-4 xl:px-6">
      <div className="flex flex-wrap items-center justify-between gap-2 py-5">
        <h1 className="me-2 text-lg font-bold dark:text-white">
          Project Tasks Timeline
        </h1>

        <div className="relative flex justify-end w-64">
          <Select onValueChange={handleViewModeChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={displayOptions.viewMode} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ViewMode.Day}>Day</SelectItem>
              <SelectItem value={ViewMode.Week}>Week</SelectItem>
              <SelectItem value={ViewMode.Month}>Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="overflow-y-hidden rounded-md bg-white shadow dark:bg-dark-secondary dark:text-white max-w-[157vh]">
        <div className="timeline">
          {ganttTasks && (
            <Gantt
              tasks={ganttTasks}
              {...displayOptions}
              columnWidth={
                displayOptions.viewMode === ViewMode.Month ? 150 : 100
              }
              listCellWidth="100px"
              barBackgroundColor={isDarkMode ? "#101214" : "#aeb8c2"}
              barBackgroundSelectedColor={isDarkMode ? "#000" : "#9ba1a6"}
            />
          )}
        </div>

        <div className="px-4 pb-5 pt-1">
          <Button onClick={() => setIsModalNewOpen(true)}>Add New Task</Button>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
