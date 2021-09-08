import { Request, Response } from "express";
import { UserModel } from "../models/user";
import bcrypt from "bcryptjs";
import { generateJWT } from "../helpers/jwt";
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user || user.state === false) {
      return res.status(400).json({
        msg: "Email or password is wrong",
        user,
      });
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Email or password is wrong",
      });
    }
    const token = await generateJWT(user.id);
    res.status(200).json({ user, token });
  } catch (error) {
    return res.status(400).json({ msg: "Something worng", error });
  }
};
