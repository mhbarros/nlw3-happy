import dotenv  from 'dotenv';
import express from 'express';
import path    from "path";
import cors    from 'cors';
dotenv.config();

import ErrorHandler from './error/handler';
import Routes       from './routes';

import 'express-async-errors';
import './db/connection';

const app = express();
app.use(cors());
app.use(express.json());
app.use(Routes);
app.use('/upload', express.static(path.join(__dirname, '..', 'upload')))
app.use(ErrorHandler);

app.listen(process.env.HTTP_PORT);