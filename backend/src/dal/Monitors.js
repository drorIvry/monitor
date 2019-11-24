import mongoose from 'mongoose';


export default mongoose.model('monitor', mongoose.Schema({
    MonitorName: String,
    APIKey: String,
    PCName: String,
    Active: Boolean,
}));