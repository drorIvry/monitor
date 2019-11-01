import express from 'express';
import Cryptr from 'cryptr';
import uuidv4 from 'uuid/v4';

import Account from '../dal/Account'


const router = express.Router();
const cryptr = new Cryptr('myTotalySecretKey');


router.post('/', function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    const encryptedPassword = cryptr.encrypt(password);

    const generatedKey = uuidv4();

    const encryptedKey = cryptr.encrypt(generatedKey);
    Account.update(
        {
            UserName: username
        },
        {
            $set: {
                Username: username,
                Password: encryptedPassword,
                APIKey: encryptedKey,
                Active: true,
            }
        },
        {
            upsert: true
        },
        err => {
            if (err)
                res.send(500, {error});

            res.send({key: generatedKey});
        }
    );
});

router.get('/', function (req, res, next) {
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [username, password] = new Buffer.from(b64auth, 'base64').toString().split(':');

    Account.findOne({UserName: username}, (error, doc) => {
        if (error)
            res.send(500, {error});

        const decryptedPass = cryptr.decrypt(doc.Password);

        if (username && password && username === doc.UserName && password === decryptedPass)
            res.end('validated');
        else {
            res.set('WWW-Authenticate', 'Basic realm="401"');
            res.status(401).send('Authentication required.');
        }
    })
});

export default router;
