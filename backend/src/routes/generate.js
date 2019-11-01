import uuidv4 from 'uuid/v4';

import Account from '../dal/Account'
export function generate (cryptr, req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password)
        res.send(400, 'Bad Request');

    const encryptedPassword = cryptr.encrypt(password);

    const generatedKey = uuidv4();

    Account.update(
        {
            UserName: username
        },
        {
            $set: {
                Username: username,
                Password: encryptedPassword,
                APIKey: generatedKey,
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
}