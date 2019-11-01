import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import helmet from 'helmet';
import errorhandler from 'errorhandler';
import Cryptr from 'cryptr';

import usersRouter from './routes/users';
import stateRouter from './routes/state';
import Account from './dal/Account';

const app = express();
const cryptr = new Cryptr('myTotalySecretKey');

mongoose.connect('mongodb://localhost/monitor', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use(
    function (req, res, next) {
        if (req.header('authorization'))
            validateBasicAuth(req, res, next);
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
app.use('/users', usersRouter);
app.use('/state', stateRouter);

module.exports = app;


const validateBasicAuth = function (req, res, next) {
    const b64auth = (req.header('authorization') || '').split(' ')[1] || '';
    const [username, password] = new Buffer.from(b64auth, 'base64').toString().split(':');

    Account.findOne({UserName: username}, (error, doc) => {
        if (error)
            res.send(500, {error});

        const decryptedPass = cryptr.decrypt(doc.Password);

        if (username && password && username === doc.UserName && password === decryptedPass)
            next();
        else {
            res.set('WWW-Authenticate', 'Basic realm="401"');
            res.status(401).send('Authentication required.');
        }
    })
};

const validateAPI = function (req, res, next) {
    const apiKey = req.header('monitor-api-key');

    if (!apiKey) {
        res.set('WWW-Authenticate', 'Basic realm="401"');
        res.status(401).send('Authentication required.');
    }
    Account.findOne({APIKey: apiKey}, (error, doc) => {
        if (error)
            res.send(500, {error});
        if(doc)
            next();
        else {
            res.set('WWW-Authenticate', 'Basic realm="401"');
            res.status(401).send('Authentication required.');
        }
    });
};