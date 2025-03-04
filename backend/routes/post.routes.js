const express = require('express')
// const requireAuth = require('../middleware/requireAuth')
const protectRoute = require('../middleware/protectRoute')
const { 
  createPost, 
  deletePost, 
  likePost, 
  commentPost, 
  getAllPost, 
  getFollowingPosts, 
} = require('../controllers/post.controller')

const router = express.Router()

router.get('/all-post',protectRoute, getAllPost)
router.get('/followingposts', protectRoute, getFollowingPosts)

router.post('/create', protectRoute, createPost)
router.post('/like/:id', protectRoute, likePost)
router.post('/comment/:id', protectRoute, commentPost)

router.delete('/delete/:id', protectRoute, deletePost)

module.exports = router