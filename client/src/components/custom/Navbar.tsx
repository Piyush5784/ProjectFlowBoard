import React from "react";
import { Search, Settings } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Input } from "../ui/input";
import { SidebarTrigger } from "../ui/sidebar";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between dark:bg-gray-900 bg-gray-300 px-4 py-3">
      <div className="flex items-center gap-8">
        {/* Sidebar Trigger first */}
        <SidebarTrigger className="text-foreground" />

        {/* Search bar */}
        <div className="relative flex h-min w-[200px]">
          <Input placeholder="Search Task" className="pl-9 pr-4 py-2 w-48" />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
        </div>
      </div>

      <div className="flex items-center">
        <ThemeToggle />
        <Link href="/settings">
          <Settings className="h-6 w-6 cursor-pointer text-muted-foreground" />
        </Link>
        <div className="ml-2 mr-5 hidden min-h-[2rem] w-[0.1rem] md:inline-block bg-border" />
      </div>
    </div>
  );
};

export default Navbar;
