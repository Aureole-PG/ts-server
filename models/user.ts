import { Schema, model } from "mongoose";
export enum rol {
  "seller",
  "user",
  "admin",
}
interface user {
  name: string;
  email: string;
  password: string;
  avatar: string;
  rol: rol;
  state: boolean;
  google: boolean;
}

const userSchema = new Schema<user>({
  name: { type: String, require: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, require: true },
  avatar: String,
  rol: { type: String, enum: rol, default: "user" },
  state: { type: Boolean, default: true },
  google: { type: Boolean, default: false },
});

userSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  return user;
};
export const UserModel = model<user>("Users", userSchema);
