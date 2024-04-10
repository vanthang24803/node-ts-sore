import express, { Router } from "express";
import validateMiddleware from "../middlewares/validate";
import { LoginSchema, RegisterSchema } from "../models/auth";
import { login, refreshToken, register } from "../controllers/auth";

const router: Router = express.Router();

router.post("/register", validateMiddleware(RegisterSchema), register);

router.post("/login", validateMiddleware(LoginSchema), login);
router.post("/refreshToken", refreshToken);

export default router;
