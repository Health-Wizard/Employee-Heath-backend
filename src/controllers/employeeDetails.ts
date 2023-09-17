import { Request, Response } from 'express';
import EmployeeDetailsDB from '../models/employeeDetails';
import User from '../models/User-Auth';

class EmployeeDetails {

  /**
   * This function creates an employee in Employee database. This function also
   * create a emp id which is a primary key extracted from the id of the login
   * user. The username is also checked if its is same with the emp id.
   * @param req 
   * @param res 
   * @returns 
   */
  createEmployeeDetails = async (req: Request, res: Response) => {
    const { empId, username, companyEmail, designation, salary, role } = req.body;
    if (!username || !companyEmail || !role) {
      console.log(username, companyEmail, role);
      return res.status(400).json({
        message: 'Username, company email and role are required.',
      });
    }

    try {
      // Check if the user already exists
      const existingUser = await EmployeeDetailsDB.findOne({ empId });
      if (existingUser) {
        return res.status(400).json({ message: 'Employee already exists.' });
      }

      const loginUser = await User.findById(empId);
      if(!loginUser) {
        return res.status(400).json({ message: 'Employee not in login dababase.' });
      }

      if(loginUser.username !== username) {
        return res.status(400).json({ message: 'Employee username does not match with login username' });
      }

      // Create a new user and save it to the database
      const newEmployeeDetails = new EmployeeDetailsDB({
        empId,
        username,
        companyEmail,
        designation,
        salary,
        role,
      });
      await newEmployeeDetails.save();
      res
        .status(201)
        .json({ message: 'Employee Details registered successfully.' });
    } catch (error) {
      console.error(error);
      console.log(error)
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  /**
   * This function implements the get all employees in the Employee database
   * but a pagination is constructed with a limit of 20 employees.
   * @param req 
   * @param res 
   */
  getEmployeeDetails = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = 20;

    try {
      const skip = (page - 1) * limit;

      const employees = await EmployeeDetailsDB.find()
        .skip(skip)
        .limit(limit)
        .exec();
      const totalEmployeeCount = await EmployeeDetailsDB.countDocuments();

      res.status(200).json({
        employees,
        currentPage: page,
        totalPages: Math.ceil(totalEmployeeCount / limit),
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  /**
   * This function fetch the list of single employee of the given emp Id 
   * @param req 
   * @param res 
   * @returns 
   */
  getSingleEmployee = async (req: Request, res: Response) => {
    const empId = req.params.id;
    if (!empId) {
      return res.status(400).json({ message: 'Emp Id is missing.' });
    }

    try {
      const employee = await EmployeeDetailsDB.findOne({ empId });
      console.log(employee);
      if (!employee) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }

      res.status(200).json({ employee });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  /**
   * This function updates the single employee data according to the given employee
   * request parameters to be updated
   * @param req 
   * @param res 
   * @returns 
   */
  updateSingleEmployee = async(req: Request, res: Response) => {
    const empId = req.params.id;
    if(!empId) {
      return res.status(400).json({ message: 'Customer Id is missing'});
    }

    try {
      const employee = await EmployeeDetailsDB.findOne({ empId });

      if(!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }

      if(req.body.companyEmail) employee.companyEmail = req.body.companyEmail;
      if(req.body.designation) employee.designation = req.body.designation;
      if(req.body.salary) employee.salary = req.body.salary;

      await employee.save();

      res.status(200).json({ message: 'Employee updated successfully', updatedEmployee: employee});
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  /**
   * This function deletes a single employee with the given emp Id
   * @param req 
   * @param res 
   * @returns 
   */
  deleteSingleEmployee = async (req: Request, res: Response) => {
    const empId = req.params.id;
    if(!empId) {
      return res.status(400).json({ message: 'Emp Id is missing'});
    }
    
    try {
      const deletedEmployee = await EmployeeDetailsDB.findOneAndRemove({ empId });
      const deletedEmployeeLogin = await User.findByIdAndRemove(empId)

      if(!deletedEmployee) {
        return res.status(404).json({message: "Employee not found."});
      }

      res.status(200).json({ deletedEmployeeLogin, deletedEmployee, message: 'Employee Deleted Successfully'});
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export default EmployeeDetails;
