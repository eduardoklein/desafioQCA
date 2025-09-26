import { prisma } from "../utils/prismaClient";

export async function getAllCategories() {
  const allCategories = await prisma.category.findMany();
  return allCategories;
}

export async function getCategoryId(id: number) {
  const categoryById = await prisma.category.findUnique({ where: { id } });
  return categoryById;
}

export async function getCategoryByName(name: string) {
  const category = await prisma.category.findUnique({ where: { name } });
  return category;
}

export async function createCategory(name: string) {
  const createdCategory = await prisma.category.create({ data: { name } });
  return createdCategory;
}

export async function updateCategory(id: number, name: string) {
  return await prisma.category.update({ where: { id }, data: { name } });
}

export async function deleteCategory(id: number) {
  console.log(id);
  return await prisma.category.delete({ where: { id } });
}
