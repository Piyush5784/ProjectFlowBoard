import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export const search = async (req: Request, res: Response): Promise<void> => {
  try {
    const { query } = req.query;
    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          { title: { contains: query as string } },
          { description: { contains: query as string } },
        ],
      },
    });
    const projects = await prisma.project.findMany({
      where: {
        OR: [
          { name: { contains: query as string } },
          { description: { contains: query as string } },
        ],
      },
    });
    const users = await prisma.user.findMany({
      where: {
        OR: [{ username: { contains: query as string } }],
      },
    });

    res.json({
      message: "Tasks successfully fetched",
      tasks,
      projects,
      users,
      success: true,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      message: `Error processing Search : ${error.message}`,
      success: false,
    });
  }
};
