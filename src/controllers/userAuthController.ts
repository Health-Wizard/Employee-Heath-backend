import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();


class UserAuthController {
  prisma = new PrismaClient();

  /**
   * This function is to register the admin with the endpoint register/admin
   * @param req
   * @param res
   * @returns
   */
  registerAdmin = async (req: Request, res: Response) => {
    const { name, username, companyEmail, password } = req.body;
    const role = 'admin';
    if (!name || !username || !companyEmail || !password) {
      console.log(username, companyEmail, password);
      return res.status(400).json({
        message: 'Username, password, name and company email are required.',
      });
    }

    try {
      // Check if the user already exists
      const existingUser = await this.prisma.register.findUnique({
        where: { username }
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
        role,
      },
    });

      res.status(201).json({ message: 'User registered successfully.', data: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  /**
   * This function is to register the employee with the endpoint register
   * @param req
   * @param res
   * @returns
   */
  registerEmployee = async (req: Request, res: Response) => {
    const { name, username, companyEmail, password } = req.body;
    const role = 'employee';
    if (!name || !username || !companyEmail || !password) {
      console.log(username, companyEmail, password);
      return res.status(400).json({
        message: 'Username, password, name and company email are required.',
      });
    }

    try {
      // Check if the user already exists
      const existingUser = await this.prisma.register.findUnique({
        where: { username }
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
        role,
      },
    });

      res.status(201).json({ message: 'User registered successfully.', data: newUser });
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
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: 'Username and password are required.' });
    }

    try {
      // Find the user by username and password
      const user = await this.prisma.register.findUnique({
        where: {
          username
        }
      });

      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if(passwordMatch) {
        const token = jwt.sign( {
          empId: user.id,
          username: user.username,
          role: user.role
        }, process.env.JWT_TOKEN_KEY as string, {expiresIn: '1h'})

        res.status(200).json({ message: "Successfully Authorized", token});
      } else {
        res.status(401).json({ message: 'Invalid username or password'});
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  /**
   * This function returns the role of a particular username
   * {
   *  "roleType": "employee/admin"
   * }
   *
   * @param req
   * @param res
   * @returns
   */
  getRole = async (req: Request, res: Response) => {
    const empId = req.params.id;

    if (!empId) {
      return res.status(400).json({ message: 'Employee Id is required' });
    }

    try {
      const employee = await this.prisma.register.findUnique({
        where: {
          id: parseInt(empId),
        },
      })

      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }

      const roleType = employee.role;
      res.status(200).json({ roleType });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
}

export default UserAuthController;
