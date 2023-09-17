import User from '../models/User-Auth';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

const secretKey: string =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

class UserAuthController {
  /**
   * This function is to register the admin with the endpoint register/admin
   * @param req
   * @param res
   * @returns
   */
  registerAdmin = async (req: Request, res: Response) => {
    const { username, companyEmail, password } = req.body;
    const role = 'admin';
    if (!username || !companyEmail || !password) {
      console.log(username, companyEmail, password);
      return res.status(400).json({
        message: 'Username, password and company email are required.',
      });
    }

    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(409).json({ message: 'Username already exists.' });
      }

      // Create a new user and save it to the database
      const newUser = new User({ username, companyEmail, password, role });
      await newUser.save();

      res.status(201).json({ message: 'User registered successfully.' });
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
    const { username, companyEmail, password } = req.body;
    const role = 'employee';
    if (!username || !companyEmail || !password) {
      console.log(username, companyEmail, password);
      return res.status(400).json({
        message: 'Username, password and company email are required.',
      });
    }

    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(409).json({ message: 'Username already exists.' });
      }

      // Create a new user and save it to the database
      const newUser = new User({ username, companyEmail, password, role });
      await newUser.save();

      res.status(201).json({ message: 'User registered successfully.' });
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
      const user = await User.findOne({ username, password });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }

      // Generate and return a JWT token
      const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
      const role = user.role;
      const empId = user._id;
      res.json({ token, empId, username, role });
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
      const employee = await User.findById(empId);

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
