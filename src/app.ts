import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { globalErrorHandler } from './middlewears/globalErrorHandler';
// import { UserRoutes } from './modules/users/userRoutes';
// import { AcademicSemesterRoutes } from './modules/academicSemester/academicSemester.route';
import routes from './routes';
import { httpStatus } from 'http-status';
const app: Application = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api/v1/user', UserRoutes);
// app.use('/api/v1/academic-semesters', AcademicSemesterRoutes);
app.use('/api/v1', routes);
// custom error Handler class

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
// global error handler
app.use(globalErrorHandler);

// route not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'api not found',
      },
    ],
  });
  next();
});
export default app;
