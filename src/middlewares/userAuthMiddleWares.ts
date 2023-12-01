import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


export const authenticateJwt = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('Authorization')?.split(' ')[1];
  console.log(token, 'token');
  if (!token) {
    return res
      .status(401)
      .json({ message: 'Access denied, no token provided' });
  }

  jwt.verify(token, process.env.JWT_TOKEN_KEY as string, (err: any, user: any) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: 'Invalid Token' });
    }
    const { empId, username, companyEmail, name } = user;
    req.user = { empId, username, companyEmail, name };
    next();
  });
};