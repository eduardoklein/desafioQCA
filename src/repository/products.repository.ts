import { prisma } from "../utils/prismaClient";

export async function getAllProducts() {
  return await prisma.product.findMany({
    include: { category: true, inventory: true },
  });
}

export async function getProductById(id: number) {
  return await prisma.product.findUnique({
    where: { id },
    include: { category: true, inventory: true },
  });
}

export async function getProductBySKU(sku: string) {
  return await prisma.product.findUnique({
    where: { sku },
    include: { category: true, inventory: true },
  });
}

export async function getProductsByCategoryId(categoryId: number) {
  return await prisma.product.findMany({
    where: { categoryId },
    include: { category: true, inventory: true },
  });
}

export async function createProduct(
  name: string,
  sku: string,
  categoryId: number
) {
  return await prisma.product.create({
    data: { name, sku, categoryId },
  });
}

export async function updateProduct(
  id: number,
  name: string,
  sku: string,
  categoryId: number
) {
  return await prisma.product.update({
    where: { id },
    data: { name, sku, categoryId },
  });
}

export async function deleteProduct(id: number) {
  return await prisma.product.delete({
    where: { id },
  });
}
