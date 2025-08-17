import React from "react";
import {
  Calendar,
  Clock,
  User,
  Tag,
  CheckCircle,
  Circle,
  AlertCircle,
} from "lucide-react";
import {
  Priority,
  Project,
  Status,
  Task,
  User as UserType,
} from "@/generated/prisma";

// Component Props Interfaces
interface TaskCardProps {
  task: Task;
}

interface ProjectCardProps {
  project: Project;
}

interface UserCardProps {
  user: UserType;
}

// Task Card Component
const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const getPriorityColor = (priority: Priority): string => {
    switch (priority) {
      case Priority.Low:
        return "bg-green-100 text-green-800 border-green-200";
      case Priority.Medium:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case Priority.High:
        return "bg-orange-100 text-orange-800 border-orange-200";
      case Priority.Urgent:
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: Status) => {
    switch (status) {
      case Status.ToDo:
        return <Circle className="w-4 h-4 text-gray-400" />;
      case Status.WorkInProgress:
        return <Clock className="w-4 h-4 text-blue-500" />;
      case Status.Completed:
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case Status.UnderReview:
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Circle className="w-4 h-4 text-gray-400" />;
    }
  };

  const formatDate = (date: Date | null): string | null => {
    if (!date) return null;
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isOverdue =
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status !== Status.Completed;

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          {getStatusIcon(task.status)}
          <h3 className="font-semibold text-gray-900 text-lg">{task.title}</h3>
        </div>
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(
            task.priority
          )}`}
        >
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="flex flex-wrap gap-2 mb-3">
        {task.startDate && (
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="w-3 h-3 mr-1" />
            Start: {formatDate(task.startDate)}
          </div>
        )}
        {task.dueDate && (
          <div
            className={`flex items-center text-xs ${
              isOverdue ? "text-red-500" : "text-gray-500"
            }`}
          >
            <Calendar className="w-3 h-3 mr-1" />
            Due: {formatDate(task.dueDate)}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {task.tags && (
            <div className="flex items-center">
              <Tag className="w-3 h-3 mr-1 text-gray-400" />
              <span className="text-xs text-gray-500">{task.tags}</span>
            </div>
          )}
          {task.points && (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
              {task.points} pts
            </span>
          )}
        </div>
        {task.assignedUserId && (
          <div className="flex items-center">
            <User className="w-4 h-4 text-gray-400 mr-1" />
            <span className="text-xs text-gray-500">
              ID: {task.assignedUserId}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

// Project Card Component
const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  type ProjectStatus = "Planning" | "Upcoming" | "Active" | "Completed";

  const formatDate = (date: Date | null): string | null => {
    if (!date) return null;
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getProjectStatus = (): ProjectStatus => {
    if (!project.startDate || !project.endDate) return "Planning";
    const now = new Date();
    const start = new Date(project.startDate);
    const end = new Date(project.endDate);

    if (now < start) return "Upcoming";
    if (now > end) return "Completed";
    return "Active";
  };

  const getStatusColor = (status: ProjectStatus): string => {
    switch (status) {
      case "Planning":
        return "bg-gray-100 text-gray-800";
      case "Upcoming":
        return "bg-blue-100 text-blue-800";
      case "Active":
        return "bg-green-100 text-green-800";
      case "Completed":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const status = getProjectStatus();

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-gray-900 text-lg">{project.name}</h3>
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
            status
          )}`}
        >
          {status}
        </span>
      </div>

      {project.description && (
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {project.description}
        </p>
      )}

      <div className="flex flex-wrap gap-4 text-xs text-gray-500">
        {project.startDate && (
          <div className="flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            Start: {formatDate(project.startDate)}
          </div>
        )}
        {project.endDate && (
          <div className="flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            End: {formatDate(project.endDate)}
          </div>
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-400">Project ID: {project.id}</span>
      </div>
    </div>
  );
};

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center space-x-3 mb-3">
        <div className="relative">
          {user.profilePictureUrl ? (
            <img
              src={user.profilePictureUrl}
              alt={user.username}
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">
                {user.username.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{user.username}</h3>
          <p className="text-sm text-gray-500">User ID: {user.userId}</p>
        </div>
      </div>

      <div className="space-y-2 text-xs text-gray-500">
        <div className="flex items-center justify-between">
          <span>Cognito ID:</span>
          <span className="font-mono text-xs truncate max-w-32">
            {user.cognitoId}
          </span>
        </div>
        {user.teamId && (
          <div className="flex items-center justify-between">
            <span>Team ID:</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
              {user.teamId}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export { TaskCard, ProjectCard, UserCard };
