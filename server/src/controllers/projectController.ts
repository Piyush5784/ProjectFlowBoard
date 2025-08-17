import { Request, Response } from "express";
import { PrismaClient, Project } from "../generated/prisma";

const prisma = new PrismaClient();

interface ApiResponse<T> {
  message: string;
  data: T;
  success: boolean;
}

export const getProjects = async (
  req: Request,
  res: Response<ApiResponse<Project[] | null>>
): Promise<void> => {
  try {
    const projects = await prisma.project.findMany({});

    res.status(200).json({
      message: "Projects successfully fetched",
      data: projects,
      success: true,
    });
  } catch (error: any) {
    console.error("Error fetching projects:", error);
    res.status(500).json({
      message: `Error retrieving projects: ${error.message}`,
      data: null,
      success: false,
    });
  }
};

export const createProject = async (
  req: Request,
  res: Response<ApiResponse<Project | null>>
): Promise<void> => {
  try {
    const { name, description, startDate, endDate } = req.body;

    // Basic validation
    if (!name || !description) {
      res.status(400).json({
        message: "Name and description are required",
        data: null,
        success: false,
      });
      return;
    }

    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
      },
    });

    res.status(201).json({
      message: "Project successfully created",
      data: newProject,
      success: true,
    });
  } catch (error: any) {
    console.error("Error creating project:", error);
    res.status(500).json({
      message: `Error creating project: ${error.message}`,
      data: null,
      success: false,
    });
  }
};
