import * as service from "../services/categories.service";

import type { Request, Response } from "express";

export async function getAllCategories(_req: Request, res: Response) {
  const allCategories = await service.getAllCategories();
  return res.status(200).json(allCategories);
}

export async function getCategoryById(req: Request, res: Response) {
  const { id } = req.params;
  const categoryById = await service.getCategoryById(Number(id));
  return res.status(200).json(categoryById);
}

export async function createCategory(req: Request, res: Response) {
  const { name } = req.body;
  const createdCategory = await service.createCategory(name);
  return res.status(201).json(createdCategory);
}

export async function updateCategory(req: Request, res: Response) {
  const { id } = req.params;
  const { name } = req.body;
  const updatedCategory = await service.updateCategory(Number(id), name);
  return res.status(200).json(updatedCategory);
}

export async function deleteCategory(req: Request, res: Response) {
  const { id } = req.params;
  const deletedCategory = await service.deleteCategory(Number(id));
  return res.status(204).json(deletedCategory);
}
