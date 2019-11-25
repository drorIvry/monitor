import mongoose from 'mongoose';
export default mongoose.model('alerts', mongoose.Schema({
  MonitorName: String,
  Alert: String,
  PCName: String,
  AlertDate: Date,
  AccountID: mongoose.Schema.Types.ObjectId,
  MonitorID: mongoose.Schema.Types.ObjectId
}));