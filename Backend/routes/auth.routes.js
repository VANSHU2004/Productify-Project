import { Router } from "express";
import {
  loginController,
  signupController,
  oauthController
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", loginController);
router.post("/signup", signupController);
router.post("/oauth/google", oauthController);


export default router;
