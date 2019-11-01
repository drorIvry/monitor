import express from 'express';
import mongoosee from 'mongoose';

import SystemState from '../dal/SystemState';


const router = express.Router();

router.get('/', function (req, res, next) {
    const accountID = req.query['account-id'];
    SystemState.findOne({AccountID: mongoosee.ObjectId(accountID)}, (error,doc) => {
        if (error)
            res.send(500, {error});
        if(!doc)
            res.status(404).send('Account Not Found!');
        else
            res.send(doc);
    })
});

export default router;
