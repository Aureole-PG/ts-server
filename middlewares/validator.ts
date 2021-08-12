import { Request, Response } from "express";
import { validationResult } from "express-validator";

export const validateValues = (req: Request, res: Response, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json(errors);
    return;
  }
  next();
};
