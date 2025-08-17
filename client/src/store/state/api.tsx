import { Project, Task, User } from "@/generated/prisma";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export * from "@/generated/prisma";

export interface TaskType extends Task {
  author: {
    userId: number;
    cognitoId: string;
    username: string;
    profilePictureUrl: string | null;
    teamId: number | null;
  };
  assignee: {
    userId: number;
    cognitoId: string;
    username: string;
    profilePictureUrl: string | null;
    teamId: number | null;
  } | null;
  attachments: {
    id: number;
    taskId: number;
    fileURL: string;
    fileName: string | null;
    uploadedById: number;
  }[];
  comments: {
    id: number;
    taskId: number;
    userId: number;
    text: string;
  }[];
}

interface ApiResponse<T> {
  message: string;
  data: T;
  success: boolean;
}

export interface SearchResults {
  tasks: Task[];
  projects?: Project[];
  users?: User[];
}
export interface Teams {
  productOnwerUsername: string | undefined;
  projectManagerUsername: string | undefined;
  id: number;
  teamName: string;
  productOwnerUserId: number | null;
  projectManagerUserId: number | null;
}
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  reducerPath: "api",
  tagTypes: ["Projects", "Tasks", "Users", "Teams"],
  endpoints: (build) => ({
    getProjects: build.query<Project[], void>({
      query: () => "projects",
      transformResponse: (response: ApiResponse<Project[]>) => response.data,
      transformErrorResponse: () => {
        return "Failed to fetch projects";
      },
      providesTags: ["Projects"],
    }),
    createProject: build.mutation<Project, Partial<Project>>({
      query: (project) => ({
        url: "projects",
        method: "POST",
        body: project,
      }),
      transformResponse: (response: ApiResponse<Project>) => response.data,
      transformErrorResponse: () => {
        return "Failed to create project";
      },
      invalidatesTags: ["Projects"],
    }),

    getTasks: build.query<TaskType[], { projectId: number }>({
      query: ({ projectId }) => `tasks?projectId=${projectId}`,
      transformResponse: (response: ApiResponse<TaskType[]>) => response.data,
      transformErrorResponse: () => {
        return "Failed to fetch tasks";
      },
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Tasks" as const, id }))
          : [{ type: "Tasks" as const }],
    }),
    getTaskByUser: build.query<TaskType[], { userId: number }>({
      query: ({ userId }) => `tasks/user/${userId}`,
      transformResponse: (response: ApiResponse<TaskType[]>) => response.data,
      transformErrorResponse: () => {
        return "Failed to fetch tasks";
      },
      providesTags: (result, error, arg) =>
        result
          ? result.map(({ id }) => ({ type: "Tasks" as const, id }))
          : [{ type: "Tasks" as const, id: arg.userId }],
    }),
    createTask: build.mutation<Task, Partial<Task>>({
      query: (task) => ({
        url: "tasks",
        method: "POST",
        body: task,
      }),
      transformResponse: (response: ApiResponse<Task>) => response.data,
      transformErrorResponse: () => {
        return "Failed to create task";
      },
      invalidatesTags: ["Tasks"],
    }),
    updateTaskStatus: build.mutation<Task, { taskId: number; status: string }>({
      query: ({ taskId, status }) => ({
        url: `tasks/${taskId}/status`,
        method: "PATCH",
        body: { status },
      }),
      transformResponse: (response: ApiResponse<Task>) => response.data,
      transformErrorResponse: () => {
        return "Failed to update task status";
      },
      invalidatesTags: ["Tasks"],
    }),

    search: build.query<SearchResults, string>({
      query: (q) => `search?query=${q}`,
    }),
    getUsers: build.query<User[], void>({
      query: () => "users",
      transformResponse: (response: ApiResponse<User[]>) => response.data,
      transformErrorResponse: () => {
        return "Failed to fetch users";
      },
      providesTags: ["Users"],
    }),
    getTeams: build.query<Teams[], void>({
      query: () => "teams",
      transformResponse: (response: ApiResponse<Teams[]>) => response.data,
      transformErrorResponse: () => {
        return "Failed to fetch teams";
      },
      providesTags: ["Teams"],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useGetTasksQuery,
  useCreateTaskMutation,
  useGetTeamsQuery,
  useGetTaskByUserQuery,
  useSearchQuery,
  useGetUsersQuery,
  useUpdateTaskStatusMutation,
} = api;
