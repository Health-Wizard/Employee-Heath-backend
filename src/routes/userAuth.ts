import express from 'express';
import UserAuthController from '../controllers/userAuthController'
const router = express.Router();

const userAuthController = new UserAuthController();

// Employee route
router.route('/register').post(userAuthController.registerEmployee);
router.route('/login').post(userAuthController.loginEmployee);

// Admin route
router.route('/register/admin').post(userAuthController.registerAdmin);

// Get Role
router.route('/role/:username').get(userAuthController.getRole)

export default router;