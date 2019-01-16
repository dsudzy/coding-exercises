const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const UsersSchema = new Schema({
    username: String,
    password: String,
    salt: String,
    companyName: String,
    address: String,
    suite: String,
    city: String,
    state: String,
    zip: String,
    tasks: [
      {
        task: String
      }
    ]
});

UsersSchema.methods.validatePassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.password === hash;
};

UsersSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    username: this.username,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, 'secret');
}

UsersSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    username: this.username,
    token: this.generateJWT(),
    companyName: this.companyName,
    address: this.address,
    suite: this.suite,
    city: this.city,
    state: this.state,
    zip: this.zip,
    task: this.tasks
  };
};

mongoose.model('Users', UsersSchema);