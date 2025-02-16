// app.ts
import express from 'express';
import bodyParser from 'body-parser';
import authRouter from './routes/auth.routes';
import userRouter from './routes/user.routes';
import elasticRouter from './routes/elastic.routes';
import testRouter from './routes/test.routes';
import cookieParser from 'cookie-parser';
import i18n from './config/i18nconfig';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(i18n.init);

app.use('/auth', authRouter);
app.use('/profile', userRouter);
app.use('/elastic', elasticRouter);
app.use('/test', testRouter);
app.use(errorHandler);
export default app;
