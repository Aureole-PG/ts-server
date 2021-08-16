import { Router } from "express";
import { check } from "express-validator";
import {
  deleteUser,
  getUser,
  getUsers,
  postUser,
  putUser,
} from "../controllers/user";
import { existUserId, rolValid, validEmail } from "../helpers/dbValidators";
import { validateValues } from "../middlewares/validator";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post(
  "/",
  [
    check("name", "Invalid name").not().isEmpty(),
    check("email", "Invalid email").isEmail().custom(validEmail),
    check("password", "Min length is 6").isLength({ min: 6 }),
    check("rol", "Rol not exist").custom(rolValid),
    validateValues,
  ],
  postUser
);
router.put(
  "/:id",
  [
    check("id", "Invalid Id").isMongoId(),
    check("id", "User not found").custom(existUserId),
    check("rol", "Rol not exist").custom(rolValid),
    validateValues,
  ],
  putUser
);
router.delete("/", deleteUser);

export default router;
