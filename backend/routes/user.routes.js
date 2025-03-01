const express = require('express')
const router = express.Router()
// const requireAuth = require('../middleware/requireAuth')
const protectRoute = require('../middleware/protectRoute')

const { getUserProfile, followAndUnfollowUser, updateUserProfile } = require('../controllers/user.controller')

router.get('/profile/:username', protectRoute, getUserProfile)
// router.get('/suggestion', getUserProfile)
router.post('/follow/:id', followAndUnfollowUser)
router.patch('/update', updateUserProfile)

module.exports = router