import express, { Application, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

const corsConfig = {
  origin: ['http://localhost:5173'],
  // credentials: true,
};

// parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsConfig));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World From SoulSyntax! ✨');
});

// main router
app.use('/api', router);

// global error handling middleware
app.use(globalErrorHandler);

// Not Found page
app.use(notFound);

export default app;
