import express from 'express';

import { AcademicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validations';
import { validateRequest } from '../../middlewears/validateRequest';
import { ENUM_USERS_ROLE } from '../../enums/users';
import auth from '../../middlewears/auth';

const router = express.Router();

router.post(
  '/create-faculty',
  validateRequest(AcademicFacultyValidation.createFacultyZodSchema),
  auth(ENUM_USERS_ROLE.SUPER_ADMIN, ENUM_USERS_ROLE.ADMIN),
  AcademicFacultyController.createFaculty
);

router.get(
  '/:id',
  auth(
    ENUM_USERS_ROLE.SUPER_ADMIN,
    ENUM_USERS_ROLE.ADMIN,
    ENUM_USERS_ROLE.FACULTY
  ),
  AcademicFacultyController.getSingleFaculty
);

router.get(
  '/',
  auth(
    ENUM_USERS_ROLE.SUPER_ADMIN,
    ENUM_USERS_ROLE.ADMIN,
    ENUM_USERS_ROLE.FACULTY
  ),
  AcademicFacultyController.getAllFaculties
);

router.patch(
  '/:id',
  validateRequest(AcademicFacultyValidation.updatefacultyZodSchema),
  auth(
    ENUM_USERS_ROLE.SUPER_ADMIN,
    ENUM_USERS_ROLE.ADMIN,
    ENUM_USERS_ROLE.FACULTY
  ),
  AcademicFacultyController.updateFaculty
);

router.delete(
  '/:id',
  auth(ENUM_USERS_ROLE.SUPER_ADMIN),
  AcademicFacultyController.deleteFaculty
);

export const AcademicFacultyRoutes = router;
