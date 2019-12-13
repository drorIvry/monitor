import express from 'express';

import Account from '../dal/Account';
import Monitors from '../dal/Monitors';
import SystemState from "../dal/SystemState";

const router = express.Router();

router.get('/', async function (req, res, next) {
    const b64auth = (req.header('authorization') || '').split(' ')[1] || '';
    const [username] = new Buffer.from(b64auth, 'base64').toString().split(':');

    const accoun_doc = await Account.findOne({UserName: username});

    const monitor_ids = accoun_doc.Monitors;

    const reports = await SystemState.find({
        MonitorID:{
            $in: monitor_ids
        }
    });

    const reportSummaries = [];

    for (const report of reports) {
       const monitor = await Monitors.findOne({_id: report.MonitorID});

        reportSummaries.push({
            PCName: monitor.PCName,
            MonitorName: monitor.MonitorName,
            TimeStamp: report.TimeStamp,
            ReportID: report._id
        })
    }

    return res.send(reportSummaries);
});

export default  router