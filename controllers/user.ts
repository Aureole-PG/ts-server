import { Request, Response } from "express";
import { UserModel } from "../models/user";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
export const getUsers = async (req: Request, res: Response) => {
  const { limit = 5, page = 0 } = req.query;
  const page_aux = Number(page) * Number(limit);
  const query = { state: true };
  const [users, total] = await Promise.all([
    UserModel.find(query).skip(Number(page_aux)).limit(Number(limit)),
    UserModel.countDocuments(query),
  ]);
  res.json({ users, total });
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
      error,
    });
  }
};

export const putUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { _id, password, google, email, ...rest } = req.body;

    if (password) {
      const salt = bcrypt.genSaltSync();
      rest.password = bcrypt.hashSync(password, salt);
    }
    const user = await UserModel.findByIdAndUpdate(id, rest);
    res.json(user);
  } catch (error) {
    res.status(404).json({
      msg: "Please talk with admin",
      error,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await UserModel.findByIdAndUpdate(id.toString(), {
    state: false,
  });
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
