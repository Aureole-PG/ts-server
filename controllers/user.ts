import { Request, Response } from "express";
import { UserModel } from "../models/user";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
export const getUsers = async (req: Request, res: Response) => {
  const users = await UserModel.find();
  res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id.toString());
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({
        msg: "user not found " + id,
      });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const postUser = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json(errors);
      return;
    }
    const { name, email, password } = req.body;
    const existEmail = await UserModel.findOne({ email });
    if (existEmail) {
      res.status(404).json({
        msg: "email aready exist ",
      });
      return;
    }
    const user = new UserModel({ name, email, password });
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(404).json({
      msg: "Please talk with admin",
      ...error,
    });
  }
};

export const putUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { body } = req;
    if (false) {
      res.status(404).json({
        msg: "User not exist",
      });
      return;
    }
    res.json("user");
  } catch (error) {
    res.status(404).json({
      msg: "Please talk with admin",
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = "await User.findByPk(id)";
  if (!user) {
    res.status(404).json({
      msg: "User not exist",
    });
    return;
  }

  res.json({
    msg: "delete usuario",
    id: id,
  });
};
