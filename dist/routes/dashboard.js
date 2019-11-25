import express from 'express';
import Account from '../dal/Account';
import SystemState from "../dal/SystemState";
const router = express.Router();
router.get('/', async function (req, res, next) {
  const b64auth = (req.header('authorization') || '').split(' ')[1] || '';
  const [username] = new Buffer.from(b64auth, 'base64').toString().split(':');
  const account_doc = await Account.findOne({
    UserName: username
  });
  const monitor_ids = account_doc.Monitors;
  const reports = await SystemState.find({
    MonitorID: {
      $in: monitor_ids
    }
  });
  const report = reports[0];

  if (!report) {
    return res.send(400, 'Not found');
  }

  const reportSummary = {
    CPU: report.CPU,
    Disk: report.Disk.usage,
    Memory: report.Memory
  };
  return res.send(reportSummary);
});
export default router;