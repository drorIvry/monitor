import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import helmet from 'helmet';
import errorhandler from 'errorhandler';
import Cryptr from 'cryptr';

import stateRouter from './routes/state';
import monitorsRouter from './routes/monitors';
import reportRouter from './routes/report_summery'
import {register, login} from './routes/account';
import {validateAPI, validateBasicAuth} from "./auth/requestAuth";

const app = express();
const cryptr = new Cryptr('myTotalySecretKey');

mongoose.connect('mongodb://localhost/monitor', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.options("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.sendStatus(200);
});

app.use(
    function (req, res, next) {
        if (req.path === '/accounts' && req.method === 'POST')
            next();
        else if (req.header('authorization'))
            validateBasicAuth(cryptr, req, res, next);
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
app.use('/monitors', monitorsRouter);
app.use('/state', stateRouter);
app.use('/reports',reportRouter);
app.get('/accounts', login);
app.post('/accounts', (req,res,next) => {
    register(cryptr, req, res, next);
});

module.exports = app;


