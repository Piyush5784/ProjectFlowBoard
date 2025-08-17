import React from "react";
import { BoardProps } from "../BoardView";
import { useGetTasksQuery, TaskType } from "@/store/state/api";
import { format } from "date-fns";
import Image from "next/image";
import { Plus, MessageSquareMore, EllipsisVertical } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

const TableView = ({ id, setIsModalNewOpen }: BoardProps) => {
  const {
    data: tasks,
    isLoading,
    isError,
  } = useGetTasksQuery({ projectId: Number(id) });

  if (isLoading) {
    return (
      <div className="text-gray-700 dark:text-gray-200">Loading tasks...</div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-600 dark:text-red-400">Error loading tasks.</div>
    );
  }

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <Table className="min-w-full border rounded-lg bg-white dark:bg-neutral-900">
          <TableHeader>
            <TableRow className="bg-gray-100 dark:bg-neutral-800">
              <TableHead className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">
                Title
              </TableHead>
              <TableHead className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">
                Assignee
              </TableHead>
              <TableHead className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">
                Status
              </TableHead>
              <TableHead className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">
                Priority
              </TableHead>
              <TableHead className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">
                Due Date
              </TableHead>
              <TableHead className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">
                Comments
              </TableHead>
              <TableHead className="px-4 py-2 text-left"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(tasks || []).map((task: TaskType) => (
              <TableRow
                key={task.id}
                className="border-b border-gray-200 dark:border-neutral-700"
              >
                <TableCell className="px-4 py-2 font-semibold text-gray-900 dark:text-gray-100">
                  {task.title}
                </TableCell>
                <TableCell className="px-4 py-2 text-gray-700 dark:text-gray-200">
                  {task.assignee ? (
                    <div className="flex items-center gap-2">
                      <Image
                        src={`/${task.assignee.profilePictureUrl!}`}
                        alt={task.assignee.username}
                        width={24}
                        height={24}
                        className="rounded-full object-cover"
                      />
                      <span>{task.assignee.username}</span>
                    </div>
                  ) : (
                    <span>-</span>
                  )}
                </TableCell>
                <TableCell className="px-4 py-2 text-gray-700 dark:text-gray-200">
                  {task.status}
                </TableCell>
                <TableCell className="px-4 py-2">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-semibold
                      ${
                        task.priority === "Urgent"
                          ? "bg-red-200 text-red-700 dark:bg-red-900 dark:text-red-300"
                          : task.priority === "High"
                          ? "bg-yellow-200 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                          : task.priority === "Medium"
                          ? "bg-green-200 text-green-700 dark:bg-green-900 dark:text-green-300"
                          : task.priority === "Low"
                          ? "bg-blue-200 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                          : "bg-gray-200 text-gray-700 dark:bg-neutral-700 dark:text-gray-300"
                      }`}
                  >
                    {task.priority}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-2 text-gray-700 dark:text-gray-200">
                  {task.dueDate ? format(new Date(task.dueDate), "P") : "-"}
                </TableCell>
                <TableCell className="px-4 py-2 flex items-center gap-1 text-gray-700 dark:text-gray-200">
                  <MessageSquareMore size={16} />
                  <span>{(task.comments && task.comments.length) || 0}</span>
                </TableCell>
                <TableCell className="px-4 py-2">
                  <button className="text-gray-500 dark:text-gray-400">
                    <EllipsisVertical size={20} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TableView;
