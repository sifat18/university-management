import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { globalErrorHandler } from './middlewears/globalErrorHandler';
// import { UserRoutes } from './modules/users/userRoutes';
// import { AcademicSemesterRoutes } from './modules/academicSemester/academicSemester.route';
import routes from './routes';
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

export default app;
