import { prisma } from "../utils/prismaClient";

export async function getAllTransactions() {
  return await prisma.transaction.findMany();
}

export async function createTransaction(data: {
  type: string;
  quantity: number;
  productId: number;
}) {
  return await prisma.transaction.create({
    data,
  });
}
