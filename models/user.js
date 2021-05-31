// Connecten met mongoose
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

let UserSchema;

UserSchema = new mongoose.Schema(
  {
    createdAt: { type: Date },
    updatedAt: { type: Date },
    password: { type: String, select: false },
    username: { type: String, required: true },
    book: { type: String, required: true },
  },
  { timestamps: { createdAt: 'created_at' } }
);

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);
