import express from 'express';

import Account from '../dal/Account';


const router = express.Router();

router.get('/', async function (req, res, next) {
    const b64auth = (req.header('authorization') || '').split(' ')[1] || '';
    const [username, password] = new Buffer.from(b64auth, 'base64').toString().split(':');

    const accoun_doc = await Account.findOne({UserName: username});

    return res.send({accountID: accoun_doc._id})

});
