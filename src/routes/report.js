import SystemState from "../dal/SystemState";
import mongoose from "mongoose";

export async function getReport(req, res, next) {
    const reportID = req.params.reportID;
    const report = await SystemState.findById(reportID);

    if(!report){
        return res.status(404).send('not found!')
    }

    return res.send(report);
}