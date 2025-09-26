import type { Request, Response } from "express";
import * as productService from "../services/products.service";
import * as categoryService from "../services/categories.service";
import { ApiError } from "../utils/apiError";

export async function checkProductsExistenceById(
  req: Request,
  res: Response,
  next: Function
) {
  const { id } = req.params;
  const product = await productService.getProductById(Number(id));
  if (!product) {
    throw new ApiError(404, "PRODUCT_NOT_FOUND", "Produto não encontrado.");
  }
  next();
}

export async function checkCategoryExistenceById(
  req: Request,
  res: Response,
  next: Function
) {
  const { id } = req.params;
  const category = await categoryService.getCategoryById(Number(id));
  if (!category) {
    throw new ApiError(404, "CATEGORY_NOT_FOUND", "Categoria não encontrada.");
  }
  next();
}

export async function checkCategoryExistenceByName(
  req: Request,
  res: Response,
  next: Function
) {
  const { name } = req.body;
  const category = await categoryService.getCategoryByName(name);
  if (category) {
    throw new ApiError(409, "CATEGORY_ALREADY_EXISTS", "Categoria já existe.");
  }
  next();
}
