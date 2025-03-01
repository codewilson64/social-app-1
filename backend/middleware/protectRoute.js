const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const protectRoute = async (req, res, next) => {
  // verify authentication
  const { authorization } = req.headers

  if(!authorization) {
    return res.status(401).json({error: 'Authorization token required!'})
  }

  const token = authorization.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.SECRET)
    req.user = await User.findById(decoded._id).select('-password')
    next()
  }
  catch (error) {
    console.log(error)
    res.status(401).json({error: 'Request is not authorized'})
  }

}

module.exports = protectRoute