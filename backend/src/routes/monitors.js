import express from 'express';
import mongoose from 'mongoose';
import Monitors from '../dal/Monitors';
import Account from '../dal/Account';


const router = express.Router();

router.get('/', async function (req, res, next) {

    const username = req.query['userName'];
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
    const username = req.body.username;
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

    Account.updateOne(
        {
            UserName: username
        },
        {
            $set: {
                Monitors: [...accoumt_doc.Monitors, mongoose.Types.ObjectId(response._id)],
                Active: true,
            }
        },
        err => {
            if (err)
                res.send(500, {error});

            res.send({key: generatedKey});
        }
    );
});

export default router;
