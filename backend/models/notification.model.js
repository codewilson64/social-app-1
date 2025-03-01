const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['follow', 'like'],
    required: true
  },
  read: {
    type: Boolean,
    default: false
  }
}, {timeStamps: true})

module.exports = mongoose.model('Notification', notificationSchema)