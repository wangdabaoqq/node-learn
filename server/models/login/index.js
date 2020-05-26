
const mongoose = require('mongoose');
const Schema = mongoose.Schema
const loginSchema = new Schema({
  username: String,
  password: String
})
// const Logins = mongoose.model('Login', loginSchema)
module.exports = mongoose.model('Login', loginSchema)
