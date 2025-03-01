const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  following: [
   { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    default: [] 
   }
  ],
  follower: [
    { 
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'User', 
     default: [] 
    }
  ],
  bio: {
    type: String,
    default: ''
  },
  profileImg: {
    type: String,
    default: ''
  }
})

module.exports = mongoose.model('User', userSchema)