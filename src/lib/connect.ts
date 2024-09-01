import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const connect = async () => {
  try {
    prisma.$connect();
  } catch (error) {
    return Error(`DB接続失敗しました: ${error}`);
  }
};
