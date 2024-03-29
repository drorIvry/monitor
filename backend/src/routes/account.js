import express from 'express';

import Account from '../dal/Account';


const router = express.Router();

export async function login(req, res, next) {
    const b64auth = (req.header('authorization') || '').split(' ')[1] || '';
    const [username, password] = new Buffer.from(b64auth, 'base64').toString().split(':');

    const accoun_doc = await Account.findOne({UserName: username});

    return res.send({
        accountID: accoun_doc._id,
        firstName: accoun_doc.firstName
    });
}

export async function register(cryptr, req, res, next){
    const username = req.body.username;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;


    if (!username || !password)
        return res.send(400, 'Bad Request');

    const doc = await Account.findOne({UserName: username});

    if(doc)
        return res.send(400, 'User Exists');

    const encryptedPassword = cryptr.encrypt(password);

    const account = new Account({
        UserName: username,
        Password: encryptedPassword,
        FirstName: firstName,
        LastName: lastName,
        APIKeys: [],
        Active: true,
    });

    await account.save();

    const newDoc = await Account.findOne({UserName: username});


    return res.send({accountID: newDoc._id});
}