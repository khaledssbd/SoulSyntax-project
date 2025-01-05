import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidations } from './auth.validation';
import { AuthControllers } from './auth.controller';

const router = express.Router();

router.post(
  '/register',
  validateRequest(AuthValidations.userValidationSchema), // middleware for validation
  AuthControllers.createUser, // controller function
);

router.post(
  '/login',
  validateRequest(AuthValidations.loginValidationSchema), // middleware for validation
  AuthControllers.loginUser, // controller function
);

export const AuthRoutes = router;
