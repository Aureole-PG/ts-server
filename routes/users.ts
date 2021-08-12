import { Router } from "express";
import { check } from "express-validator";
import {
  deleteUser,
  getUser,
  getUsers,
  postUser,
  putUser,
} from "../controllers/user";
import { validateValues } from "../middlewares/validator";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post(
  "/",
  [
    check("name", "Invalid name").not().isEmpty(),
    check("email", "Invalid email").isEmail(),
    check("password", "Min length is 6").isLength({ min: 6 }),
    check("rol", "Rol not exist").isIn(["seller", "user", "admin"]),
    validateValues,
  ],
  postUser
);
router.put("/:id", putUser);
router.delete("/", deleteUser);

export default router;
