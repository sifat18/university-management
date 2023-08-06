import express from 'express';
// import { ENUM_USER_ROLE } from '../../../enums/user';
// import auth from '../../middlewares/auth';
// import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentController } from './academicDepartment.controller';
import { AcademicDepartmentValidation } from './academicDepartment.validations';
import { ENUM_USERS_ROLE } from '../../enums/users';
import { validateRequest } from '../../middlewears/validateRequest';
import auth from '../../middlewears/auth';

const router = express.Router();

router.post(
  '/create-department',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentZodSchema
  ),
  auth(ENUM_USERS_ROLE.SUPER_ADMIN, ENUM_USERS_ROLE.ADMIN),
  AcademicDepartmentController.createDepartment
);

router.get('/:id', AcademicDepartmentController.getSingleDepartment);

router.get('/', AcademicDepartmentController.getAllDepartments);

router.patch(
  '/:id',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentZodSchema
  ),
  auth(ENUM_USERS_ROLE.SUPER_ADMIN, ENUM_USERS_ROLE.ADMIN),
  AcademicDepartmentController.updateDepartment
);

router.delete(
  '/:id',
  auth(ENUM_USERS_ROLE.SUPER_ADMIN),
  AcademicDepartmentController.deleteDepartment
);

export const AcademicDepartmentRoutes = router;
