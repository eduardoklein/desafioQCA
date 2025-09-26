import { Router } from "express";
import * as controller from "../controllers/inventories.controller";

const router = Router();

router.get("/", controller.getAllInventories);
router.get("/:id", controller.getInventoriesByProductId);
router.post("/in", controller.registerProductOnInventory);
router.post("/out", controller.removeProductOnInventory);

export default router;
