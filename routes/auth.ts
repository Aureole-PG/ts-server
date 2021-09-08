import { Router } from "express";
import { check } from "express-validator";
import { login } from "../controllers/auth";
import { validateValues } from "../middlewares/validator";
const router = Router();

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    validateValues,
  ],
  login
);

export default router;
