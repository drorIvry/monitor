import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import helmet from 'helmet';
import errorhandler from 'errorhandler';

import indexRouter from './routes/index';
import usersRouter from './routes/users';

const app = express();

mongoose.connect('mongodb://localhost/monitor', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


app.disable('x-powered-by');
app.use(logger('dev'));
app.use(express.json());
app.use(helmet());
app.use(errorhandler());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
