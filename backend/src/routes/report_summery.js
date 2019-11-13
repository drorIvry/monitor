import express from 'express';

import Account from '../dal/Account';
import Monitors from '../dal/Monitors';

const router = express.Router();

router.get('/', async function (req, res, next) {
    const b64auth = (req.header('authorization') || '').split(' ')[1] || '';
    const [username] = new Buffer.from(b64auth, 'base64').toString().split(':');

    const accoun_doc = await Account.findOne({UserName: username});

    const monitor_ids = accoun_doc.Monitors;
    const monitors = await Monitors.find({
        _id: {
            $in: monitor_ids
        }
    });



    return res.send(monitors)

});
