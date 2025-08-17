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
import { useCreateProjectMutation } from "@/store/state/api";

export function CreateProjectDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [createProject, { isLoading }] = useCreateProjectMutation();
  const [form, setForm] = useState({
    projectName: "",
    projectDescription: "",
    startDate: "",
    endDate: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit: (
    e: React.FormEvent<HTMLFormElement>
  ) => Promise<void> = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createProject({
        name: form.projectName,
        description: form.projectDescription,
        startDate: new Date(form.startDate),
        endDate: new Date(form.endDate),
      });
      setOpen(false);

      setForm({
        projectName: "",
        projectDescription: "",
        startDate: "",
        endDate: "",
      });
    } catch (err) {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Project</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>
              Enter the details for your new project. Click create when you're
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-3">
              <Label htmlFor="project-name">Project Name</Label>
              <Input
                id="project-name"
                name="projectName"
                placeholder="Enter project name"
                value={form.projectName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="project-description">Description</Label>
              <Input
                id="project-description"
                name="projectDescription"
                placeholder="Enter project description"
                value={form.projectDescription}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                id="start-date"
                name="startDate"
                type="date"
                placeholder="Select start date"
                value={form.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="end-date">End Date</Label>
              <Input
                id="end-date"
                name="endDate"
                type="date"
                placeholder="Select end date"
                value={form.endDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button" disabled={loading}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
