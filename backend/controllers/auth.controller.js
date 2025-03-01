const User = require('../models/user.model')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createTokenAndSetCookie = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
  // res.cookie('jwt', token, {
  //   maxAge: 3*24*60*60*1000,
  //   httpOnly: true,
  //   sameSite: 'strict',
  //   secure: process.env.NODE_ENV !== 'development'
  // })
}

// Signup
const signup = async (req, res) => {
  const { fullName, username, email, password } = req.body

  try {
    // validation
    if(!fullName || !username || !email || !password) {
      return res.status(400).json({ error: 'All fields must be filled' })
    }
    if(!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Invalid email' })
    }
    if(!validator.isStrongPassword(password)) {
      return res.status(400).json({ error: 'Password is too weak' })
    }

    // check if user email & username exist
    const emailExists = await User.findOne({email})
    if(emailExists) {
      return res.status(400).json({ error: 'Email already in use' })
    }

    const usernameExists = await User.findOne({username}) 
    if(usernameExists) {
      return res.status(400).json({ error: 'Username already in use' })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = new User({
      fullName,
      username,
      email,
      password: hash
    })

    if(user) {
      const token = createTokenAndSetCookie(user.id)
      await User.create(user)
      res.status(200).json({user, token})
    }

  }
  catch(error) {
    res.status(400).json({ error: error.message })
  }
}

// Login
const login = async (req, res) => {
  const { username, password } = req.body

  try {
    // validation
    if(!username || !password) {
        return res.status(400).json({ error: 'All fields must be filled' })
    }

    // check if user exist
    const user = await User.findOne({username})
    if(!user) {
        return res.status(400).json({error: 'Username incorrect'})
    }

    // match password
    const passwordMatch = await bcrypt.compare(password, user.password)
    if(!passwordMatch) {
        return res.status(400).json({error: 'Password incorrect'})
    }

    const token = createTokenAndSetCookie(user.id)

    res.status(200).json({user, token})
  }
  catch(error) {
    res.status(400).json({ error: error.message })
  }
}

// Logout
const logout = async (req, res) => {
  try {
    res.cookie('jwt', '', {maxAge: 0})
    res.status(200).json({ message: 'Logout successful' })
  }
  catch(error) {
    res.status(400).json({ error: error.message })
  }
}

// Get Auth User
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password')
    res.status(200).json(user)
  }
  catch(error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = { signup, login, logout, getUser }