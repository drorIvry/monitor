import mongoose from 'mongoose';


export default mongoose.model('account', mongoose.Schema({
    UserName: String,
    Password: String,
    FirstName: String,
    LastName: String,
    APIKeys: [Object],
    Active: Boolean,
}));