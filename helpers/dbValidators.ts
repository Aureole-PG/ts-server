import { rol, UserModel } from "../models/user";

export const rolValid = async (rol_: string = "user") => {
  const rolExist = await Object.values(rol).includes(rol_);
  if (!rolExist) {
    throw new Error(`The rol ${rol_} doesn't exist`);
  }
};

export const validEmail = async (email: string = "") => {
  const existEmail = await UserModel.findOne({ email });
  if (existEmail) {
    throw new Error(`Email already exist`);
  }
};
