import Account from '../dal/Account';
import uuidv4 from 'uuid/v4'

export async function register (cryptr, req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password)
        return res.send(400, 'Bad Request');

    const doc = await Account.findOne({UserName: username});

    if(doc)
        return res.send(400, 'User Exists');

    const encryptedPassword = cryptr.encrypt(password);
    const generatedKey = uuidv4();

    const account = new Account({
        UserName: username,
        Password: encryptedPassword,
        APIKey: generatedKey,
        Active: true,
    });

    await account.save();

    return res.send({key: generatedKey});
}