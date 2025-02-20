import { Router } from "express";
import routerUrl from "../utils/routeUrls.js";
import protect from '../middleware/authMiddleware.js';
import { createPrice,  getAllPrice,  getSinglePrice } from "../controller/price/priceController.js";

const router=Router();

router.post(routerUrl.createPrice, protect,createPrice);
router.get(routerUrl.getPrice, protect, getSinglePrice);
router.get(routerUrl.getAllPrice,protect,getAllPrice)
export default router;