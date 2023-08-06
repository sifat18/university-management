import express from 'express';
import { FacultyController } from './faculty.controller';
import { FacultyValidation } from './faculty.validations';
import auth from '../../middlewears/auth';
import { ENUM_USERS_ROLE } from '../../enums/users';
import { validateRequest } from '../../middlewears/validateRequest';

const router = express.Router();

router.get(
  '/:id',
  auth(
    ENUM_USERS_ROLE.SUPER_ADMIN,
    ENUM_USERS_ROLE.ADMIN,
    ENUM_USERS_ROLE.FACULTY
  ),
  FacultyController.getSingleFaculty
);

router.get(
  '/',
  auth(
    ENUM_USERS_ROLE.SUPER_ADMIN,
    ENUM_USERS_ROLE.ADMIN,
    ENUM_USERS_ROLE.FACULTY
  ),
  FacultyController.getAllFaculties
);

router.patch(
  '/:id',
  validateRequest(FacultyValidation.updateFacultyZodSchema),
  auth(ENUM_USERS_ROLE.SUPER_ADMIN, ENUM_USERS_ROLE.ADMIN),
  FacultyController.updateFaculty
);

router.delete(
  '/:id',
  auth(ENUM_USERS_ROLE.SUPER_ADMIN),
  FacultyController.deleteFaculty
);

export const FacultyRoutes = router;
