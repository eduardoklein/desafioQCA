import { Router } from "express";
import categoriesRoutes from "./categories.routes";
import inventoriesRoutes from "./inventories.routes";
import productsRoutes from "./products.routes";
import transactionsRoutes from "./transactions.routes";

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/products", productsRoutes);
router.use("/inventories", inventoriesRoutes);
router.use("/transactions", transactionsRoutes);

export default router;
