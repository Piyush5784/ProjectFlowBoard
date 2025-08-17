import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { DialogHeader, DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { useState } from "react";
import { Priority, Status, useCreateTaskMutation } from "@/store/state/api";

type TaskFormState = {
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  tags: string;
  startDate: string;
  dueDate: string;
  authorUserId: string;
  assignedUserId: string;
  projectId: string;
};

export function CreateTaskDialog({
  open,
  setOpen,
  projectId,
}: {
  open: boolean;
  projectId: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const initialState: TaskFormState = {
    title: "",
    description: "",
    status: Status.ToDo,
    priority: Priority.Backlog,
    tags: "",
    startDate: "",
    dueDate: "",
    authorUserId: "",
    assignedUserId: "",
    projectId,
  };

  const [createTask, { isLoading }] = useCreateTaskMutation();
  const [form, setForm] = useState<TaskFormState>({
    ...initialState,
    projectId,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createTask({
        ...form,
        status: form.status,
        priority: form.priority,
        tags: form.tags,
        startDate: form.startDate ? new Date(form.startDate) : undefined,
        dueDate: form.dueDate ? new Date(form.dueDate) : undefined,
        projectId: form.projectId ? Number(form.projectId) : undefined,
        authorUserId: form.authorUserId ? Number(form.authorUserId) : undefined,
        assignedUserId: form.assignedUserId
          ? Number(form.assignedUserId)
          : undefined,
      });
      setOpen(false);
      setForm(initialState);
    } catch (err) {
      // handle error
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Task</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl min-h-[350px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
            <DialogDescription>
              Enter the details for your new task. Click create when you're
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-6 py-4">
            <div className="grid gap-3">
              <Label htmlFor="task-title">Title</Label>
              <Input
                id="task-title"
                name="title"
                placeholder="Enter task title"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="task-description">Description</Label>
              <Input
                id="task-description"
                name="description"
                placeholder="Enter task description"
                value={form.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="task-status">Status</Label>
              <select
                id="task-status"
                name="status"
                value={form.status}
                onChange={handleChange}
                className="border rounded px-2 py-1"
                required
              >
                {Object.values(Status).map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="task-priority">Priority</Label>
              <select
                id="task-priority"
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="border rounded px-2 py-1"
                required
              >
                {Object.values(Priority).map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="task-tags">Tags (comma separated)</Label>
              <Input
                id="task-tags"
                name="tags"
                placeholder="tag1, tag2"
                value={form.tags}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                id="start-date"
                name="startDate"
                type="date"
                value={form.startDate}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="due-date">Due Date</Label>
              <Input
                id="due-date"
                name="dueDate"
                type="date"
                value={form.dueDate}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="author-user-id">Author User ID</Label>
              <Input
                id="author-user-id"
                name="authorUserId"
                placeholder="Enter author user ID"
                value={form.authorUserId}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="assigned-user-id">Assigned User ID</Label>
              <Input
                id="assigned-user-id"
                name="assignedUserId"
                placeholder="Enter assigned user ID"
                value={form.assignedUserId}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="project-id">Project ID</Label>
              <Input
                id="project-id"
                name="projectId"
                placeholder="Enter project ID"
                value={form.projectId}
                disabled
                onChange={handleChange}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button" disabled={isLoading}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
