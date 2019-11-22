import Monitors from "../dal/Monitors";
import express from "express";

const router = express.Router();

router.post('/', async function (req, res, next) {
    const apiKeys = req.body.apiKeys;
    await Monitors.remove({
        APIKey: {$in: apiKeys},
    });

    return res.send({'success': true});

});

export default router;