import * as service from "../services/transactions.service";
import type { Request, Response } from "express";

export async function getAllTransactions(_req: Request, res: Response) {
  const transactions = await service.getAllTransactions();
  return res.status(200).json(transactions);
}
