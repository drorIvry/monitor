import mongoose from 'mongoose';


export default mongoose.model('account', mongoose.Schema({
    UserName: String,
    Password: String,
    APIKey: String,
    Active: Boolean,
}));