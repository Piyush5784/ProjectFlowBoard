import React from "react";
import { BoardProps } from "../BoardView";
import { useGetTasksQuery, TaskType } from "@/store/state/api";
import { format } from "date-fns";
import Image from "next/image";
import { Plus, MessageSquareMore, EllipsisVertical } from "lucide-react";

const ListView = ({ id, setIsModalNewOpen }: BoardProps) => {
  const {
    data: tasks,
    isLoading,
    isError,
  } = useGetTasksQuery({ projectId: Number(id) });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></span>
        <span className="ml-4 text-lg font-medium">Loading tasks...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64 text-red-500">
        Error loading tasks.
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 dark:bg-dark-primary min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Tasks</h2>
        {/* <button
          onClick={() => setIsModalNewOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary-dark transition"
        >
          <Plus size={18} />
          New Task
        </button> */}
      </div>
      <div className="space-y-4">
        {(tasks || []).map((task: TaskType) => (
          <div
            key={task.id}
            className="flex items-center justify-between rounded-xl border border-gray-200 dark:border-dark-tertiary bg-white dark:bg-dark-secondary p-5 shadow hover:shadow-md transition"
          >
            <div className="flex items-center gap-6 flex-1">
              <div className="flex flex-col gap-1 min-w-[180px]">
                <span className="font-semibold text-lg">{task.title}</span>
                <span className="text-xs text-gray-500 dark:text-neutral-400">
                  {task.dueDate
                    ? `Due: ${format(new Date(task.dueDate), "P")}`
                    : "No due date"}
                </span>
              </div>
              <div className="flex items-center gap-2 min-w-[120px]">
                {task.assignee ? (
                  <>
                    <Image
                      src={`/${task.assignee.profilePictureUrl!}`}
                      alt={task.assignee.username}
                      width={32}
                      height={32}
                      className="rounded-full object-cover border"
                    />
                    <span className="text-sm font-medium">
                      {task.assignee.username}
                    </span>
                  </>
                ) : (
                  <span className="text-sm text-gray-400 italic">
                    Unassigned
                  </span>
                )}
              </div>
              <span className="text-xs px-3 py-1 rounded-full border bg-gray-100 dark:bg-dark-tertiary font-medium min-w-[70px] text-center">
                {task.status}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold min-w-[70px] text-center ${
                  task.priority === "Urgent"
                    ? "bg-red-100 text-red-700 border border-red-200"
                    : task.priority === "High"
                    ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
                    : task.priority === "Medium"
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : task.priority === "Low"
                    ? "bg-blue-100 text-blue-700 border border-blue-200"
                    : "bg-gray-100 text-gray-700 border border-gray-200"
                }`}
              >
                {task.priority}
              </span>
              <div className="flex items-center gap-1 text-sm min-w-[60px]">
                <MessageSquareMore size={16} className="text-gray-400" />
                <span>{(task.comments && task.comments.length) || 0}</span>
              </div>
            </div>
            <button className="text-gray-400 hover:text-primary dark:text-neutral-500 transition">
              <EllipsisVertical size={22} />
            </button>
          </div>
        ))}
        {tasks && tasks.length === 0 && (
          <div className="text-center text-gray-400 py-12">No tasks found.</div>
        )}
      </div>
    </div>
  );
};
export default ListView;
