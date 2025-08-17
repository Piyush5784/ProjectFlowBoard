"use client";
import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Briefcase,
  Calendar,
  ChevronDown,
  ChevronUp,
  Home,
  Inbox,
  Layers,
  Search,
  Settings,
  ShieldAlert,
  User,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Project, useGetProjectsQuery } from "@/store/state/api";

// Menu items.
const items = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "Timeline",
    href: "/timeline",
    icon: Briefcase,
  },
  {
    title: "Search",
    href: "/search",
    icon: Search,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    title: "Users",
    href: "/users",
    icon: User,
  },
  {
    title: "Teams",
    href: "/teams",
    icon: Users,
  },
];

const prioprtyItems = [
  {
    title: "Urgent",
    href: "/priority/urgent",
    icon: AlertCircle,
  },
  {
    title: "High",
    href: "/priority/high",
    icon: ShieldAlert,
  },
  {
    title: "Medium",
    href: "/priority/medium",
    icon: AlertTriangle,
  },
  {
    title: "Low",
    href: "/priority/low",
    icon: AlertOctagon,
  },
  {
    title: "Backlog",
    href: "/proprity/backlog",
    icon: Layers,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  const { data: projects } = useGetProjectsQuery();
  const [showProjects, setShowProjects] = useState(true);
  const [showPriorty, setShowPriority] = useState(false);

  return (
    <Sidebar>
      <SidebarContent className="dark:bg-gray-900 bg-gray-300 ">
        <SidebarGroup>
          <SidebarGroupLabel className="flex  items-center justify-between">
            Application <SidebarTrigger className="text-foreground md:hidden" />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (pathname === "/" && item.href === "/dashboard");

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`
                       ${isActive && "bg-blue-400 hover:bg-blue-400"} 
                      `}
                    >
                      <a href={item.href}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
              {/* Project List */}
              {showProjects &&
                projects?.map((project: Project) => (
                  <SidebarMenuItem key={project.id}>
                    <SidebarMenuButton
                      asChild
                      // className={`
                      //  ${isActive && "bg-blue-400 hover:bg-blue-400"}
                      // `}
                    >
                      <a href={`/projects/${project.id}`}>
                        <Briefcase />
                        <span>{project.name}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}

              <SidebarMenuItem key={"Prority"}>
                <SidebarMenuButton
                  asChild
                  className={showPriorty ? "" : ""}
                  onClick={() => setShowPriority((prev) => !prev)}
                >
                  <div className="flex items-center cursor-pointer">
                    <ChevronUp
                      className={`transition-transform duration-300 ${
                        showPriorty ? "rotate-0" : "rotate-180"
                      }`}
                    />
                    <span className="ml-2">Priority</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  showPriorty ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="flex flex-col">
                  {prioprtyItems.map((item) => {
                    const isActive =
                      pathname === item.href ||
                      (pathname === "/" && item.href === "/dashboard");

                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          className={isActive ? "bg-gray-950" : ""}
                        >
                          <a href={item.href}>
                            <item.icon />
                            <span>{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </div>
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
