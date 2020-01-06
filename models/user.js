//Mongoose
const mongoose = require('mongoose');

//Schema
const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

//export the Schema as a model
const User = mongoose.model('User', UserSchema);

//export the Schema for the controllers
module.exports = User;