import * as service from "../services/inventories.service";
import type { Request, Response } from "express";

export async function getAllInventories(req: Request, res: Response) {
  const inventories = await service.getAllInventories();
  return res.status(200).json(inventories);
}

export async function getInventoriesByProductId(req: Request, res: Response) {
  const { id } = req.params;
  const productQuantity = await service.getInventoriesByProductId(Number(id));
  return res.status(200).json(productQuantity);
}

export async function registerProductOnInventory(req: Request, res: Response) {
  const { productId, quantity } = req.body;
  const updatedInventory = await service.registerProductOnInventory(
    productId,
    quantity
  );
  return res.status(200).json(updatedInventory);
}

export async function removeProductOnInventory(req: Request, res: Response) {
  const { productId, quantity } = req.body;
  const updatedInventory = await service.removeProductOnInventory(
    productId,
    quantity
  );
  return res.status(200).json(updatedInventory);
}
