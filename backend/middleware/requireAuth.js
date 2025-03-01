const User = require('../models/user.model')
const jwt = require('jsonwebtoken')

const requireAuth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt
    if(!token) {
      return res.status(400).json({error: 'Unauthorized token'})
    }

    const decoded = jwt.verify(token, process.env.SECRET)
    if(!decoded) {
      return res.status(400).json({error: 'Invalid token'})
    }

    const user = await User.findById(decoded._id).select('-password')
    req.user = user
    next()
   }
  catch(error) {
    console.log('Error in requireAuth middleware', error.message)
    res.status(400).json({error: error.message})
  }
}

module.exports = requireAuth
