import express from 'express';
import mongoose from 'mongoose';
import SystemState from '../dal/SystemState';
import Account from '../dal/Account';
import Monitors from '../dal/Monitors';
import Alerts from '../dal/Alerts';

import getAlerts from './GetAlerts';

const router = express.Router();

router.get('/', async function (req, res, next) {
    const b64auth = (req.header('authorization') || '').split(' ')[1] || '';
    const [username] = new Buffer.from(b64auth, 'base64').toString().split(':');

    const account_doc = await Account.findOne({UserName: username});

    const docs = await SystemState.find({AccountID: mongoose.Types.ObjectId(account_doc._id)});

    if (!docs)
        return res.status(404).send('Account Not Found!');
    else
        return res.send(docs);

});

router.post('/', async function (req, res, next) {
    const apiKey = req.header('monitor-api-key');
    const account = await Account.findOne({APIKeys: apiKey});
    if (!account) {
        return res.send(404, {error: 'account not found'})
    }
    const accountID = account._id.toString();
    const previous = await SystemState.findOne({AccountID: mongoose.Types.ObjectId(accountID)});
    const monitor = await Monitors.findOne({APIKey: apiKey});

    const data = parseData(req.body, accountID, previous, monitor);
    const alerts = getAlerts(req.body, monitor, account._id);
    const alertRequests = alerts.map(alert => {
            return {

                insertOne: {
                    document: alert
                }

            }
        }
    );

    await Alerts.bulkWrite(alertRequests);

    await SystemState.updateOne(
        {
            AccountID: mongoose.Types.ObjectId(accountID),
            MonitorID: monitor._id
        },
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

function parseData(data, accountID, previous, monitor) {
    return {
        AccountID: mongoose.Types.ObjectId(accountID),
        MonitorID: monitor._id,
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
