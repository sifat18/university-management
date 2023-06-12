import express from 'express';
import { createUser } from './userController';
import { validateRequest } from '../../middlewears/validateRequest';
import { createUserZodSchema } from './userValidation';

const router = express.Router();

router.post('/create', validateRequest(createUserZodSchema), createUser);

export const UserRoutes = router;
