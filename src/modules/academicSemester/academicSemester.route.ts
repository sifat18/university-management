import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterValidation } from './acdemicSemester.validation';
import { ENUM_USERS_ROLE } from '../../enums/users';
import { validateRequest } from '../../middlewears/validateRequest';
import auth from '../../middlewears/auth';
const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  auth(ENUM_USERS_ROLE.SUPER_ADMIN, ENUM_USERS_ROLE.ADMIN),
  AcademicSemesterController.createSemester
);

router.get(
  '/:id',
  auth(
    ENUM_USERS_ROLE.SUPER_ADMIN,
    ENUM_USERS_ROLE.ADMIN,
    ENUM_USERS_ROLE.FACULTY,
    ENUM_USERS_ROLE.STUDENT
  ),
  AcademicSemesterController.getSingleSemester
);

router.get(
  '/',
  auth(
    ENUM_USERS_ROLE.SUPER_ADMIN,
    ENUM_USERS_ROLE.ADMIN,
    ENUM_USERS_ROLE.FACULTY,
    ENUM_USERS_ROLE.STUDENT
  ),
  AcademicSemesterController.getAllSemesters
);

router.patch(
  '/:id',
  validateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
  auth(ENUM_USERS_ROLE.SUPER_ADMIN, ENUM_USERS_ROLE.ADMIN),
  AcademicSemesterController.updateSemester
);

router.delete(
  '/:id',
  auth(ENUM_USERS_ROLE.SUPER_ADMIN, ENUM_USERS_ROLE.ADMIN),
  AcademicSemesterController.deleteSemester
);

export const AcademicSemesterRoutes = router;
