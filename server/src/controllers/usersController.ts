import { Request, Response } from "express";
import { PrismaClient, Project, User } from "../generated/prisma";

const prisma = new PrismaClient();

interface ApiResponse<T> {
  message: string;
  data: T;
  success: boolean;
}

export const getUsers = async (
  req: Request,
  res: Response<ApiResponse<User[] | null>>
): Promise<void> => {
  try {
    const users = await prisma.user.findMany({});

    res.status(200).json({
      message: "Projects successfully fetched",
      data: users,
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({
      message: `Error retrieving users: ${error.message}`,
      data: null,
      success: false,
    });
  }
};
