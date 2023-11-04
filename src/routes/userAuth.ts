import express from 'express';
import UserAuthController from '../controllers/userAuthController'
import EmployeeDetails from '../controllers/employeeDetails';
import { authenticateJwt } from '../middlewares/userAuthMiddleWares';
const router = express.Router();

const userAuthController = new UserAuthController();
const employeeDetails = new EmployeeDetails();

// Employee route
router.route('/register').post(userAuthController.registerEmployee);
router.route('/login').post(userAuthController.loginEmployee);

// Admin route
router.route('/register/admin').post(userAuthController.registerAdmin);

// Get Role
router.route('/role/:id').get(authenticateJwt, userAuthController.getRole)

// Employee Form route
router.route('/createEmployee').post(employeeDetails.createEmployeeDetails);
router.route('/getEmployees').get(employeeDetails.getEmployeeDetails);
router.route('/getEmployee/:id').get(employeeDetails.getSingleEmployee);
router.route('/deleteEmployee/:id').delete(employeeDetails.deleteSingleEmployee);
router.route('/updateEmployee/:id').post(employeeDetails.updateSingleEmployee);

export default router;