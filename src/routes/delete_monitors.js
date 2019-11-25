import Monitors from "../dal/Monitors";
import SystemState from "../dal/SystemState";
import express from "express";

const router = express.Router();

router.post('/', async function (req, res, next) {
    const apiKeys = req.body.apiKeys;
    const docs = await Monitors.find({
        APIKey: {$in: apiKeys},
    });
    const monitorIds = docs.map((doc) => doc._id);
    await Monitors.remove({
        APIKey: {$in: apiKeys},
    });
    await SystemState.remove({
        MonitorID: {$in: monitorIds}
    });
    return res.send({'success': true});

});

export default router;