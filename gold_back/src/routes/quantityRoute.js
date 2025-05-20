import {Router} from "express";
import routerUrl from "../utils/routeUrls.js";
import protect from "../middleware/authMiddleware.js";
import { createQuantity } from "../controller/quantity/quantityController.js";
 
const router = Router();
router.post(routerUrl.createQuantity,protect,createQuantity)

export default router;