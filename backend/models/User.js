const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    user : String,
    pwdHash : String,
})

module.exports = mongoose.model('User', UserSchema)