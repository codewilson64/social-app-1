const express = require('express')
const router = express.Router()
// const requireAuth = require('../middleware/requireAuth')
const protectRoute = require('../middleware/protectRoute')

const { getUserProfile, followAndUnfollowUser, updateUserProfile, getSuggestedUsers } = require('../controllers/user.controller')

router.get('/profile/:username', protectRoute, getUserProfile)
router.get('/suggested-users', protectRoute, getSuggestedUsers)
router.post('/follow/:id', protectRoute, followAndUnfollowUser)
router.patch('/update', protectRoute, updateUserProfile)

module.exports = router