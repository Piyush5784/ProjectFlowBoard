import { PrismaClient } from "../src/generated/prisma";
import fs from "fs";
import path from "path";
const prisma = new PrismaClient();

async function deleteAllData(orderedFileNames: string[]) {
  // Map file names to correct Prisma model names (lowercase)
  const modelNameMap: { [key: string]: string } = {
    "team.json": "team",
    "project.json": "project",
    "projectTeam.json": "projectTeam",
    "user.json": "user",
    "task.json": "task",
    "attachment.json": "attachment",
    "comment.json": "comment",
    "taskAssignment.json": "taskAssignment",
  };

  for (const fileName of orderedFileNames) {
    const modelName = modelNameMap[fileName];
    if (!modelName) {
      console.warn(`No model mapping found for ${fileName}`);
      continue;
    }

    const model: any = prisma[modelName as keyof typeof prisma];
    if (!model) {
      console.warn(`Model ${modelName} not found in Prisma client`);
      continue;
    }

    try {
      await model.deleteMany({});
      console.log(`Cleared data from ${modelName}`);
    } catch (error) {
      console.error(`Error clearing data from ${modelName}:`, error);
    }
  }
}

async function updateSequence() {
  const tableNames = [
    "Team",
    "Project",
    "ProjectTeam",
    "Task",
    "Attachment",
    "Comment",
    "TaskAssignment",
  ];

  for (const tableName of tableNames) {
    try {
      await prisma.$executeRawUnsafe(
        `SELECT setval(pg_get_serial_sequence('"${tableName}"', 'id'), coalesce(max(id)+1, 1), false) FROM "${tableName}";`
      );
      console.log(`Reset sequence for ${tableName}`);
    } catch (error) {
      console.error(`Error resetting sequence for ${tableName}:`, error);
    }
  }
}

async function main() {
  const dataDirectory = path.join(__dirname, "seedData");

  const orderedFileNames = [
    "team.json",
    "project.json",
    "projectTeam.json",
    "user.json",
    "task.json",
    "attachment.json",
    "comment.json",
    "taskAssignment.json",
  ];

  await deleteAllData(orderedFileNames);

  // Map file names to correct Prisma model names (lowercase)
  const modelNameMap: { [key: string]: string } = {
    "team.json": "team",
    "project.json": "project",
    "projectTeam.json": "projectTeam",
    "user.json": "user",
    "task.json": "task",
    "attachment.json": "attachment",
    "comment.json": "comment",
    "taskAssignment.json": "taskAssignment",
  };

  for (const fileName of orderedFileNames) {
    const filePath = path.join(dataDirectory, fileName);
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const modelName = modelNameMap[fileName];

    if (!modelName) {
      console.warn(`No model mapping found for ${fileName}`);
      continue;
    }

    const model: any = prisma[modelName as keyof typeof prisma];
    if (!model) {
      console.warn(`Model ${modelName} not found in Prisma client`);
      continue;
    }

    try {
      for (const data of jsonData) {
        await model.create({ data });
      }
      console.log(`Seeded ${modelName} with data from ${fileName}`);
    } catch (error) {
      console.error(`Error seeding data for ${modelName}:`, error);
    }
  }

  await updateSequence();
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
