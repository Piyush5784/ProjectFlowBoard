"use client";

import { Priority, Task } from "@/generated/prisma";
import { useGetTaskByUserQuery } from "@/store/state/api";
import { useTheme } from "next-themes";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
interface ResuablePriorityPageProps {
  priority: Priority;
}
const ResuablePriorityPage = (props: ResuablePriorityPageProps) => {
  const [view, setView] = useState<"List" | "Table">("List");
  const [openModal, setOpenModal] = useState(false);

  const {
    data: tasks,
    isError,
    isLoading,
  } = useGetTaskByUserQuery({ userId: 1 });

  const isDarkMode = useTheme().theme == "dark";

  const filteredTasks = tasks?.filter(
    (task: Task) => task.priority == props.priority
  );

  return (
    <Card>
      <CardContent>
        <div className="flex items-center mb-4 gap-4">
          <span>List View</span>
          <Switch
            checked={view === "Table"}
            onCheckedChange={(checked) => setView(checked ? "Table" : "List")}
          />
          <span>Table View</span>
        </div>

        {isLoading && (
          <div className="space-y-2">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-6 w-2/3" />
          </div>
        )}
        {isError && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Error loading tasks.</AlertDescription>
          </Alert>
        )}

        {!isLoading && !isError && (
          <>
            {filteredTasks && filteredTasks.length === 0 && (
              <Alert>
                <AlertTitle>No tasks found</AlertTitle>
                <AlertDescription>
                  No tasks found for this priority.
                </AlertDescription>
              </Alert>
            )}

            {filteredTasks && filteredTasks.length > 0 && (
              <>
                {view === "List" ? (
                  <ul className="space-y-2">
                    {filteredTasks.map((task) => (
                      <li key={task.id} className="p-2 border rounded">
                        <strong>{task.title}</strong> - {task.description}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTasks.map((task) => (
                        <TableRow key={task.id}>
                          <TableCell>{task.title}</TableCell>
                          <TableCell>{task.description}</TableCell>
                          <TableCell>{task.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ResuablePriorityPage;
