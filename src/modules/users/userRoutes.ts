import express from 'express';
import { createStudent } from './userController';
import { validateRequest } from '../../middlewears/validateRequest';
import { createUserZodSchema } from './userValidation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(createUserZodSchema),
  createStudent
);

export const UserRoutes = router;
