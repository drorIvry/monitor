import uuidv4 from 'uuid/v4';

import Account from '../dal/Account'
export function generate (req, res, next) {
    const username = req.body.username;

    if (!username)
        return res.send(400, 'Bad Request');


    const generatedKey = uuidv4();

    Account.update(
        {
            UserName: username
        },
        {
            $set: {
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