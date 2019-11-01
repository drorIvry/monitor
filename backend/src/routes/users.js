import express from 'express';
import Cryptr from 'cryptr';
import uuidv4 from 'uuid/v4';

import Account from '../dal/Account'


const router = express.Router();

/* GET users listing. */
router.post('/', function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    const cryptr = new Cryptr('myTotalySecretKey');
    const encryptedPassword = cryptr.encrypt(password);

    const generatedKey = uuidv4();

    const encryptedKey = cryptr.encrypt(generatedKey);
    Account.update(
        {
            UserName:username
        },
        {
            $set:{
                Username:username,
                Password:encryptedPassword,
                APIKey: encryptedKey,
                Active: true,
            }
        },
        {
            upsert:true
        },
            err => {
            if(err)
                res.send(500, {error});

            res.send({key: generatedKey});
        }
    );
});

export default router;
