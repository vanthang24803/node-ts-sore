import express, { Router } from "express";
import validateMiddleware from "../middlewares/validate";
import { LoginSchema, RegisterSchema } from "../models/auth";
import { login, profile, refreshToken, register } from "../controllers/auth";
import { verifyAuth } from "../middlewares/auth";

const router: Router = express.Router();

router.post("/register", validateMiddleware(RegisterSchema), register);

router.post("/login", validateMiddleware(LoginSchema), login);
router.post("/refresh", refreshToken);
router.get("/profile", verifyAuth, profile);

export default router;
