"use client";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import Header from "@/components/custom/Header";
import {
  Clock,
  Filter,
  Grid3X3,
  List,
  Share,
  Table,
  Search,
} from "lucide-react";
import { CreateProjectDialog } from "@/components/custom/create-project-dialog";

type Props = {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};

const ProjectHeader = ({ activeTab, setActiveTab }: Props) => {
  const [openModelCreateProject, setOpenModelCreateProject] = useState(false);

  return (
    <>
      <div className="px-4 xl:px-6">
        <div className=" pt-6 py-6  flex items-center justify-center">
          <Header name="Product Design Development" />{" "}
          <div>
            <CreateProjectDialog
              open={openModelCreateProject}
              setOpen={setOpenModelCreateProject}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap-reverse gap-2 border-b border-gray-200 pb-2 pt-2 dark:border-gray-100 md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-1 md:gap-2">
            <TabButton
              name="Board"
              icon={<Grid3X3 size={16} />}
              setActiveTab={setActiveTab}
              activeTab={activeTab}
            />
            <TabButton
              name="List"
              icon={<List size={16} />}
              setActiveTab={setActiveTab}
              activeTab={activeTab}
            />
            <TabButton
              name="Timeline"
              icon={<Clock size={16} />}
              setActiveTab={setActiveTab}
              activeTab={activeTab}
            />
            <TabButton
              name="Table"
              icon={<Table size={16} />}
              setActiveTab={setActiveTab}
              activeTab={activeTab}
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="hover:dark:text-gray-950"
            >
              <Filter size={16} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="hover:dark:text-gray-950"
            >
              <Share size={16} />
            </Button>

            <div className="relative">
              <Input
                placeholder="Search Task"
                className="pl-9 pr-4 py-2 w-48"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectHeader;

type TabButtonProps = {
  name: string;
  icon: React.ReactNode;
  setActiveTab: (tabName: string) => void;
  activeTab: string;
};

const TabButton = ({ name, icon, setActiveTab, activeTab }: TabButtonProps) => {
  const isActive = activeTab === name;

  return (
    <button
      className={`relative flex items-center gap-2 px-1 py-2 text-gray-500 after:absolute cursor-pointer after:-bottom-[9px] after:left-0 after:h-[1px] after:w-full hover:text-blue-600 dark:text-neutral-500 dark:hover:text-black sm:px-2 lg:px-4 ${
        isActive ? "text-blue-600 after:bg-blue-600 dark:text-black" : ""
      }`}
      onClick={() => setActiveTab(name)}
    >
      {icon}
      {name}
    </button>
  );
};
