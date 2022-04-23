const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { validationPassword, validationEmail } = require("../../utils/validators/validators");
const { setError } = require('../../utils/error/error');

const userSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  surname: { type: String, trim: true, required: true },
  password: { type: String, trim: true, required: true },
  email: { type: String, trim: true, required: true },
  direction: { type: String, trim: true, required: false },
});

userSchema.pre("save", function (next) {
  if (!validationPassword(this.password)) {
    return next(setError(404, 'This password is not valid.'));
  }
  if (!validationEmail(this.email)) {
    return next(setError(404, 'This email is not valid.'));
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

const User = mongoose.model("users", userSchema);
module.exports = User;