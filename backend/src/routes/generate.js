import uuidv4 from 'uuid/v4';

import Account from '../dal/Account'
export async function generate (req, res, next) {
    const username = req.body.username;

    if (!username)
        return res.send(400, 'Bad Request');


    const generatedKey = uuidv4();
    const doc = await Account.findOne({
        UserName: username
    });

    if (!doc)
        return res.send(400, 'Bad Request');


    console.log(doc)
    Account.updateOne(
        {
            UserName: username
        },
        {
            $set: {
                APIKeys: [...doc.APIKeys, generatedKey],
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