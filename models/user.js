// Connecten met mongoose
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// Schema maken
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  book: String,
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);
