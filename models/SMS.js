var mongoose = require('mongoose');

var smsSchema = new mongoose.Schema({
  phoneNumber: { type: String, unique: true },
  messages: Array
}, { timestamps: true, discriminatorKey : '_type' });

var SMS = mongoose.model('SMS', smsSchema);

module.exports = SMS;
