import express from 'express';
import mongoose from 'mongoose';
import Monitors from '../dal/Monitors';
import Account from '../dal/Account';
import uuidv4 from 'uuid/v4'

const router = express.Router();

router.get('/', async function (req, res, next) {

    const b64auth = (req.header('authorization') || '').split(' ')[1] || '';
    const [username] = new Buffer.from(b64auth, 'base64').toString().split(':');

    if (!username)
        return res.send(400, 'Bad Request');

    const accoumt_doc = await Account.findOne({
        UserName: username
    });
    if (!accoumt_doc)
        return res.send(400, 'Bad Request!!!!');

    const monitors = await Monitors.find({
        _id: {
            $in: accoumt_doc.Monitors
        }
    });

    return res.send(monitors)

});

router.delete('/', async function (req, res, next) {
    const apiKey = req.query['apiKey'];

    await Monitors.remove({
       APIKey: apiKey,
    });

    return res.send({'success': true});

});

router.post('/', async function (req, res, next) {
    const b64auth = (req.header('authorization') || '').split(' ')[1] || '';
    const [username] = new Buffer.from(b64auth, 'base64').toString().split(':');
    const monitorName = req.body.monitorName;
    const pcName = req.body.pcName;

    if (!username)
        return res.send(400, 'Bad Request');


    const generatedKey = uuidv4();
    const accoumt_doc = await Account.findOne({
        UserName: username
    });
    if (!accoumt_doc)
        return res.send(400, 'Bad Request!!!!');

    const monitor = new Monitors({
        MonitorName: monitorName,
        APIKey: generatedKey,
        PCName: pcName,
        Active: true
    });

    const response = await monitor.save();

    const monitorDoc = await Account.updateOne(
        {
            UserName: username
        },
        {
            $set: {
                Monitors: [...accoumt_doc.Monitors, mongoose.Types.ObjectId(response._id)],
                APIKeys: [...accoumt_doc.APIKeys, generatedKey],
                Active: true,
            }
        },
        err => {
            if (err)
                res.send(500, {error});
        }
    );

    return res.send(monitorDoc)
});

export default router;
