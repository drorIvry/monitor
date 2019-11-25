import mongoose from 'mongoose';
export default mongoose.model('system_state', mongoose.Schema({
  AccountID: mongoose.Schema.Types.ObjectId,
  MonitorID: mongoose.Schema.Types.ObjectId,
  CPU: [mongoose.Schema.Types.Mixed],
  OS: mongoose.Schema.Types.Mixed,
  Memory: mongoose.Schema.Types.Mixed,
  Disk: mongoose.Schema.Types.Mixed,
  Network: [mongoose.Schema.Types.Mixed],
  Temperatures: mongoose.Schema.Types.Mixed,
  Fans: mongoose.Schema.Types.Mixed,
  Battery: mongoose.Schema.Types.Mixed,
  Users: [mongoose.Schema.Types.Mixed],
  TimeStamp: String
}));