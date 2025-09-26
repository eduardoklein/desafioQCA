import * as service from "../services/products.service";

import type { Request, Response } from "express";

import { generateSKU } from "../utils/generateSku";

export async function getAllProducts(req: Request, res: Response) {
  const products = await service.getAllProducts();
  return res.status(200).json(products);
}

export async function getProductByCategoryId(req: Request, res: Response) {
  const { categoryId } = req.params;
  const productsByCategory = await service.getProductsByCategoryId(
    Number(categoryId)
  );
  return res.status(200).json(productsByCategory);
}

export async function getProductById(req: Request, res: Response) {
  const { id } = req.params;
  const foundProduct = await service.getProductById(Number(id));
  return res.status(200).json(foundProduct);
}

export async function createProduct(req: Request, res: Response) {
  const { name, categoryId, quantity } = req.body;
  const sku = generateSKU();

  const createdProduct = await service.createProduct(
    name,
    sku,
    Number(categoryId),
    Number(quantity)
  );
  return res.status(201).json({ createdProduct });
}

export async function updateProduct(req: Request, res: Response) {
  const { id } = req.params;
  const { name, sku, categoryId } = req.body;
  const updatedProduct = await service.updateProduct(
    Number(id),
    name,
    sku,
    Number(categoryId)
  );
  return res.status(200).json(updatedProduct);
}

export async function deleteProduct(req: Request, res: Response) {
  const { id } = req.params;
  const deletedProduct = await service.deleteProduct(Number(id));
  return res.status(204).json(deletedProduct);
}
