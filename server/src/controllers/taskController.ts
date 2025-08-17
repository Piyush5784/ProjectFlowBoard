import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { projectId } = req.query;
    const tasks = await prisma.task.findMany({
      where: {
        projectId: Number(projectId),
      },
      include: {
        author: true,
        assignee: true,
        comments: true,
        attachments: true,
      },
    });

    res.json({
      message: "Tasks successfully fetched",
      data: tasks,
      success: true,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      message: `Error retriving tasks : ${error.message}`,
      data: null,
      success: false,
    });
  }
};

export const updateTaskStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    if (!taskId && !status) {
      res.status(400).json({ error: "Task id is required" });
      return;
      return;
    }

    const updatedTask = await prisma.task.update({
      where: {
        id: Number(taskId),
      },
      data: {
        status,
      },
    });

    res.json({
      message: "Updated task successfully",
      data: updatedTask,
      success: true,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      message: `Error updating tasks : ${error.message}`,
      data: null,
      success: false,
    });
  }
};

export const createTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      title,
      description,
      status,
      priority,
      tags,
      startDate,
      dueDate,
      points,
      projectId,
      authorUserId,
      assignedUserId,
    } = req.body;
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status,
        priority,
        tags,
        startDate,
        dueDate,
        points,
        projectId,
        authorUserId,
        assignedUserId,
      },
    });

    res.status(201).json({
      message: "Task successfully created",
      data: newTask,
      success: true,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      message: `Error create Task : ${error.message}`,
      data: null,
      success: false,
    });
  }
};

export const getUserTasks = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;
    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          {
            authorUserId: Number(userId),
          },
          { assignedUserId: Number(userId) },
        ],
      },
    });

    res.json({
      message: "Tasks successfully fetched",
      data: tasks,
      success: true,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      message: `Error retriving user tasks : ${error.message}`,
      data: null,
      success: false,
    });
  }
};
