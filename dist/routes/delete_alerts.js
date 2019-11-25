import Alerts from "../dal/Alerts";
import express from "express";
const router = express.Router();
router.post('/', async function (req, res, next) {
  const alertIds = req.body.alertIds;
  const docs = await Alerts.find({
    alertIds: {
      $in: alertIds
    }
  });
  await Alerts.remove({
    _id: {
      $in: alertIds
    }
  });
  return res.send({
    'success': true
  });
});
export default router;