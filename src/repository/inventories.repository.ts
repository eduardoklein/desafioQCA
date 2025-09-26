import { prisma } from "../utils/prismaClient";

export async function getAllInventories() {
  return await prisma.inventory.findMany();
}

export async function getInventoriesByProductId(productId: number) {
  return await prisma.inventory.findUnique({
    where: { productId },
    include: { product: true },
  });
}

export async function createInventory(data: {
  productId: number;
  quantity: number;
}) {
  return await prisma.inventory.create({
    data: data,
  });
}

export async function deleteInventory(productId: number) {
  return await prisma.inventory.delete({
    where: { productId },
  });
}

export async function changeProductQuantity(
  productId: number,
  quantity: number
) {
  return await prisma.inventory.update({
    where: { productId },
    data: { quantity },
  });
}

export async function inventoryTransaction(
  productId: number,
  quantity: number,
  type: "ENTRADA" | "SAIDA"
) {
  return await prisma.$transaction(async (tx) => {
    const updated = await tx.inventory.update({
      where: { productId },
      data: { quantity },
    });
    await tx.transaction.create({
      data: {
        type,
        quantity,
        productId,
      },
    });
    return updated;
  });
}
