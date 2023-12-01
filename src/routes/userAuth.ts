import express from 'express';
import UserAuthController from '../controllers/userAuthController';
import EmployeeDetails from '../controllers/employeeDetails';
import { authenticateJwt } from '../middlewares/userAuthMiddleWares';
const router = express.Router();

const userAuthController = new UserAuthController();
const employeeDetails = new EmployeeDetails();

// Employee route
router.route('/register').post(userAuthController.registerEmployee);
router.route('/login').post(userAuthController.loginEmployee);

// Admin route
// router.route('/register/admin').post(userAuthController.registerAdmin);

// Company Names
router
  .route('/companyName')
  .get(authenticateJwt, employeeDetails.getUniqueCompanyNames);

// Get Role
router.route('/role/:id').get(authenticateJwt, userAuthController.getRole);

// Employee Form route
router
  .route('/createEmployee')
  .post(authenticateJwt, employeeDetails.createEmployeeDetails);
router
  .route('/createAdmin')
  .post(authenticateJwt, employeeDetails.createAdminDetails);
router
  .route('/getEmployees')
  .get(authenticateJwt, employeeDetails.getEmployeeDetails);
router
  .route('/getEmployee/:id')
  .get(authenticateJwt, employeeDetails.getSingleEmployee);
router
  .route('/deleteEmployee/:id')
  .delete(authenticateJwt, employeeDetails.deleteSingleEmployee);
router
  .route('/updateEmployee/:id')
  .post(authenticateJwt, employeeDetails.updateSingleEmployee);

export default router;
