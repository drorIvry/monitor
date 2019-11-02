import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import helmet from 'helmet';
import errorhandler from 'errorhandler';
import Cryptr from 'cryptr';

import {generate} from './routes/generate';
import stateRouter from './routes/state';
import {register} from './routes/register';
import {validateAPI, validateBasicAuth} from "./auth/requestAuth";

const app = express();
const cryptr = new Cryptr('myTotalySecretKey');

mongoose.connect('mongodb://localhost/monitor', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use(
    function (req, res, next) {
        if (req.header('authorization'))
            validateBasicAuth(cryptr, req, res, next);
        else if (req.path === '/register')
            next();
        else
            validateAPI(req, res, next);
    }
);

app.disable('x-powered-by');
app.use(logger('dev'));
app.use(express.json());
app.use(helmet());
app.use(errorhandler());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.post('/generate', generate);
app.use('/state', stateRouter);
app.post('/register', (req, res, next) => {register(cryptr, req, res, next)});

module.exports = app;


