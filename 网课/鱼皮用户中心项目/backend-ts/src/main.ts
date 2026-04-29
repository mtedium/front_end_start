import express from 'express';
import session from 'express-session';
import cors from 'cors';
import userRouter from './controller/UserController';
import { globalExceptionHandler } from './middleware/GlobalExceptionHandler';
import { initDatabase } from './db/Database';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(session({
  secret: 'yupi-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 },
}));

app.use('/api/user', userRouter);
app.use(globalExceptionHandler);

async function start() {
  await initDatabase();
  app.listen(8080, () => {
    console.log('Server running on http://localhost:8080');
  });
}

start();