const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 50 },
  email: { type: String, required: true, minlength: 3, maxlength: 100 },
  password: { type: String, required: true, minlength: 3, maxlength: 200 },
  admin: { type: Boolean, required: true, default: false},
  createdAt: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
