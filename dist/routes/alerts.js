import express from 'express';
import mongoose from 'mongoose';
import Alerts from '../dal/Alerts';
import Account from '../dal/Account';
const router = express.Router();
router.get('/', async function (req, res, next) {
  const b64auth = (req.header('authorization') || '').split(' ')[1] || '';
  const [username] = new Buffer.from(b64auth, 'base64').toString().split(':');
  const account_doc = await Account.findOne({
    UserName: username
  });
  if (!account_doc) return res.status(404).send('Account Not Found!');
  const docs = await Alerts.find({
    AccountID: mongoose.Types.ObjectId(account_doc._id)
  });
  return res.send(docs);
});
export default router;