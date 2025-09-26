import { Router } from "express";
import * as controller from "../controllers/transactions.controller";

const router = Router();

router.get("/", controller.getAllTransactions);

export default router;
