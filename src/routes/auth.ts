import express, { Router } from "express";
import validateMiddleware from "../middlewares/validate";
import { LoginSchema, RegisterSchema } from "../models/auth";
import { verifyAuth } from "../middlewares/auth";
import { AuthController } from "../controllers/auth";

const authController = new AuthController();

const router: Router = express.Router();

router.post(
  "/register",
  validateMiddleware(RegisterSchema),
  authController.register
);

router.post("/login", validateMiddleware(LoginSchema), authController.login);
router.post("/refresh", authController.refreshToken);
router.get("/profile", verifyAuth, authController.profile);

export default router;
