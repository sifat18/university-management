import express from 'express';
// import validateRequest from '../../middlewares/validateRequest';
// import { UserController } from './user.controller';

import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterValidation } from './acdemicSemester.validation';
import { validateRequest } from '../../middlewears/validateRequest';
const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemester
);
router.get('/', AcademicSemesterController.getAllSemester);

router.get('/:id', AcademicSemesterController.getSingleSemester);

router.patch(
  '/:id',
  validateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
  AcademicSemesterController.updateSemester
);

router.delete('/:id', AcademicSemesterController.deleteSemester);
export const AcademicSemesterRoutes = router;
