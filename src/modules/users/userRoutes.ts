import express from 'express';
import { createAdmin, createFaculy, createStudent } from './userController';
import { validateRequest } from '../../middlewears/validateRequest';
import { UserValidation } from './userValidation';
import { ENUM_USERS_ROLE } from '../../enums/users';
import auth from '../../middlewears/auth';

const router = express.Router();
router.post(
  '/create-student',
  validateRequest(UserValidation.createStudentZodSchema),
  auth(ENUM_USERS_ROLE.SUPER_ADMIN, ENUM_USERS_ROLE.ADMIN),
  createStudent
);

router.post(
  '/create-faculty',
  validateRequest(UserValidation.createFacultyZodSchema),
  auth(ENUM_USERS_ROLE.SUPER_ADMIN, ENUM_USERS_ROLE.ADMIN),
  createFaculy
);

router.post(
  '/create-admin',
  validateRequest(UserValidation.createAdminZodSchema),
  auth(ENUM_USERS_ROLE.SUPER_ADMIN, ENUM_USERS_ROLE.ADMIN),
  createAdmin
);

export const UserRoutes = router;
