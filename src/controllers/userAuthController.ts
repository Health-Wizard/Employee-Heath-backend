import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { checkUsername } from '../handlers/authHandlers';
dotenv.config();

class UserAuthController {
  prisma = new PrismaClient();

  // /**
  //  * This function is to register the admin with the endpoint register/admin
  //  * @param req
  //  * @param res
  //  * @returns
  //  */
  // registerAdmin = async (req: Request, res: Response) => {
  //   const { name, username, companyEmail, password, companyName } = req.body;
  //   const role = 'admin';
  //   if (!name || !username || !companyEmail || !password || !companyName) {
  //     return res.status(400).json({
  //       message:
  //         'Username, password, name, company name and company email are required.',
  //     });
  //   }

  //   try {
  //     // Check if the user already exists
  //     const existingUser = await this.prisma.register.findUnique({
  //       where: { username },
  //     });
  //     if (existingUser) {
  //       return res.status(409).json({ message: 'Username already exists.' });
  //     }

  //     const hashedPassword = await bcrypt.hash(password, 10);

  //     // Create a new user and save it to the database
  //     const newUser = await this.prisma.register.create({
  //       data: {
  //         name,
  //         username,
  //         companyEmail,
  //         password: hashedPassword,
  //         companyName,
  //         role,
  //       },
  //     });

  //     res
  //       .status(201)
  //       .json({ message: 'User registered successfully.', data: newUser });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: 'Internal Server Error' });
  //   }
  // };

  /**
   * This function is to register the employee with the endpoint register
   * @param req
   * @param res
   * @returns
   */
  registerEmployee = async (req: Request, res: Response) => {
    const { name, username, companyEmail, password } = req.body;
    console.log(name, username, companyEmail, password);
    if (!name || !username || !companyEmail || !password) {
      console.log(username, companyEmail, password);
      return res.status(400).json({
        message: 'Username, password, name and company email are required.',
      });
    }

    try {
      // Check if the user already exists
      const existingUser = await this.prisma.register.findUnique({
        where: { username },
      });
      if (existingUser) {
        return res.status(409).json({ message: 'Username already exists.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user and save it to the database
      const newUser = await this.prisma.register.create({
        data: {
          name,
          username,
          companyEmail,
          password: hashedPassword,
        },
      });

      res
        .status(201)
        .json({ message: 'User registered successfully.', data: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  /**
   * This function is to login the employee or admin in /login endpoint
   * The structure of the response of login is
   * {
   *  "token": "jwt token retuned"
   *  "empId": "employee Id extracted from the _id of the MongoDB _doc"
   *  "username": "username of the employee/admin"
   *  "role": "role type employee/admin"
   * }
   *
   * @param req
   * @param res
   * @returns
   */
  loginEmployee = async (req: Request, res: Response) => {
    const { companyEmail, password } = req.body;
    if (!companyEmail || !password) {
      return res
        .status(400)
        .json({ message: 'companyEmail and password are required.' });
    }

    try {
      // Find the user by companyEmail and password
      const user = await this.prisma.register.findUnique({
        where: {
          companyEmail,
        },
      });

      if (!user) {
        return res
          .status(401)
          .json({ message: 'Invalid company email or password' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const token = jwt.sign(
          {
            empId: user.id,
            username: user.username,
            companyEmail: user.companyEmail,
            name: user.name,
          },
          process.env.JWT_TOKEN_KEY as string,
          { expiresIn: '1h' }
        );

        const access = await checkUsername(user.username)

        res
          .status(200)
          .json({
            message: 'Successfully Authorized',
            token,
            isRegistered: access.isRegistered
          });
      } else {
        res.status(401).json({ message: 'Invalid username or password' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

}

export default UserAuthController;
