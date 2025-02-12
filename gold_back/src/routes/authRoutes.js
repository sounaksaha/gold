import { Router } from "express";
import routerUrl from "../utils/routeUrls.js";
import { loginUser, registerUser } from "../controller/auth/authController.js";



const router=Router();

router.post(routerUrl.adminRegister,registerUser)
router.post(routerUrl.login,loginUser)

export default router;