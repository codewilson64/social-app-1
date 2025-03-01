const express = require('express')
const { signup, login, logout, getUser } = require('../controllers/auth.controller')
// const requireAuth = require('../middleware/requireAuth')
const protectRoute = require('../middleware/protectRoute')

const router = express.Router()

router.get('/user', protectRoute, getUser)
router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)

module.exports = router