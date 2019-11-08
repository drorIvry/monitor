import express from 'express';
import mongoose from 'mongoose';
import SystemState from '../dal/SystemState';
import Account from '../dal/Account';


const router = express.Router();

router.get('/', async function (req, res, next) {
    const accountID = req.query['account-id'];
    const doc = await SystemState.findOne({AccountID: mongoose.Types.ObjectId(accountID)})

    if(!doc)
        return res.status(404).send('Account Not Found!');
    else
        return res.send(doc);

});

router.post('/', async function(req, res, next){
    const apiKey = req.header('monitor-api-key');
    const account = await Account.findOne({APIKey: apiKey});
    const accountID = account._id.toString();
    const previous = await SystemState.findOne({AccountID: mongoose.Types.ObjectId(accountID)});

    const data = parseData(req.body, accountID, previous);

    SystemState.updateOne(
        {AccountID: mongoose.Types.ObjectId(accountID)},
        {...data},
        {upsert: true},
        err => {
            if (err)
                res.send(500, {err});
            else
                res.send({
                    'success': true
                });
        })
});

function parseData(data, accountID, previous){
    return {
        AccountID: mongoose.Types.ObjectId(accountID),
        CPU: previous ? [...previous.CPU, {...data.cpu, time: new Date()}] : [{...data.cpu, time: new Date()}],
        OS: data.os,
        Memory: data.memory,
        Disk: data.disk,
        Network: data.network,
        Temperatures: data.temps,
        Fans: data.fans,
        Battery: data.battery,
        Users: data.users,
        TimeStamp: data.timestamp,
    }
}

export default router;
