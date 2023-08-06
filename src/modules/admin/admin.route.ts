import express from 'express';
import { AdminController } from './admin.controller';
import { AdminValidation } from './admin.validation';
import { ENUM_USERS_ROLE } from '../../enums/users';
import auth from '../../middlewears/auth';
import { validateRequest } from '../../middlewears/validateRequest';
const router = express.Router();

router.get(
  '/:id',
  auth(ENUM_USERS_ROLE.SUPER_ADMIN, ENUM_USERS_ROLE.ADMIN),
  AdminController.getSingleAdmin
);
router.get(
  '/',
  auth(ENUM_USERS_ROLE.SUPER_ADMIN, ENUM_USERS_ROLE.ADMIN),
  AdminController.getAllAdmins
);

router.patch(
  '/:id',
  validateRequest(AdminValidation.updateAdmin),
  auth(ENUM_USERS_ROLE.SUPER_ADMIN, ENUM_USERS_ROLE.ADMIN),
  AdminController.updateAdmin
);

router.delete(
  '/:id',
  auth(ENUM_USERS_ROLE.SUPER_ADMIN),
  AdminController.deleteAdmin
);

export const AdminRoutes = router;
