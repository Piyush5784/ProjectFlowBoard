import { Request, Response } from "express";
import { PrismaClient, Project, Team, User } from "../generated/prisma";

const prisma = new PrismaClient();

interface ApiResponse<T> {
  message: string;
  data: T;
  success: boolean;
}

export const getTeams = async (
  req: Request,
  res: Response<ApiResponse<Team[] | null>>
): Promise<void> => {
  try {
    const teams = await prisma.team.findMany({});

    const teamsWithUsername = await Promise.all(
      teams.map(async (team: Team) => {
        const productOnwer = await prisma.user.findUnique({
          where: { userId: team.productOwnerUserId! },
          select: { username: true },
        });

        const projectManger = await prisma.user.findUnique({
          where: { userId: team.projectManagerUserId! },
          select: { username: true },
        });

        return {
          ...team,
          productOnwerUsername: productOnwer?.username,
          projectManagerUsername: projectManger?.username,
        };
      })
    );

    res.status(200).json({
      message: "Projects successfully fetched",
      data: teamsWithUsername,
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({
      message: `Error retrieving teams: ${error.message}`,
      data: null,
      success: false,
    });
  }
};
