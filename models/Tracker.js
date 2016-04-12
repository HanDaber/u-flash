var mongoose = require('mongoose');

var trackerSchema = new mongoose.Schema({
  phoneNumber: { type: String, lowercase: true, unique: true, default: '12345' },
  someNumber: String,
  messages: Array
}, { timestamps: true });

var Tracker = mongoose.model('Tracker', trackerSchema);

module.exports = Tracker;
