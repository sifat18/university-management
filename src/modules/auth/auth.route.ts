import express from 'express';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';
import { validateRequest } from '../../middlewears/validateRequest';
import { ENUM_USERS_ROLE } from '../../enums/users';
import auth from '../../middlewears/auth';
const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
);

router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);

router.post(
  '/change-password',
  validateRequest(AuthValidation.changePasswordZodSchema),
  auth(
    ENUM_USERS_ROLE.SUPER_ADMIN,
    ENUM_USERS_ROLE.ADMIN,
    ENUM_USERS_ROLE.FACULTY,
    ENUM_USERS_ROLE.STUDENT
  ),
  AuthController.changePassword
);

export const AuthRoutes = router;
