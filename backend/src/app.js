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
import reportSummeryRouter from './routes/report_summery';
import dashboardRouter from './routes/dashboard';
import deleteMonitorRouter from './routes/delete_monitors';
import deleteAlertsRouter from './routes/delete_alerts';
import alertRouter from './routes/alerts';
import {getReport} from './routes/report';
import {login, register} from './routes/account';
import {validateAPI, validateBasicAuth} from "./auth/requestAuth";

const app = express();
const cryptr = new Cryptr('myTotalySecretKey');

mongoose.connect('mongodb://localhost/monitor', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// app.use(
//     function (req, res, next) {
//         if (req.path === '/accounts' && req.method === 'POST')
//             next();
//         else if (req.header('authorization'))
//             validateBasicAuth(cryptr, req, res, next);
//         else
//             validateAPI(req, res, next);
//     }
// );
app.use(express.static(path.join(__dirname,'/build')));
app.disable('x-powered-by');
app.use(logger('dev'));
app.use(express.json());
app.use(helmet());
app.use(errorhandler());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/monitors', monitorsRouter);
app.use('/state', stateRouter);
app.use('/dashboard', dashboardRouter);
app.use('/delete-monitor', deleteMonitorRouter);
app.use('/delete-alerts', deleteAlertsRouter);
app.use('/alerts', alertRouter);
app.get('/report/:reportID', getReport);
app.use('/reports',reportSummeryRouter);
app.get('/login', login);
app.post('/accounts', (req,res,next) => {
    register(cryptr, req, res, next);
});
app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/build/index.html'));
});

module.exports = app;


