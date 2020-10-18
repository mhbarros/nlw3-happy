import express from 'express';
import 'express-async-errors';
import Routes from './routes';
import cors from 'cors';

import ErrorHandler from './error/handler';

import './db/connection';
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());
app.use(Routes);
app.use('/upload', express.static(path.join(__dirname, '..', 'upload')))
app.use(ErrorHandler);

app.listen(3333);