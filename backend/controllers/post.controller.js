const Post = require("../models/post.model")
const User = require('../models/user.model')
const Notification = require('../models/notification.model')

// Get all Post
const getAllPost = async (req, res) => {
  try {
    const post = await Post.find().sort({createdAt: -1}).populate({
      path: 'user',
      select: '-password'
    })
    .populate({
      path: 'comments.user',
      select: '-password'
    })
    res.status(200).json(post)  
  } 
  catch (error) {
    console.log('Error in getAllPost controller', error.message)
    res.status(400).json({error: error.message})
  }
}

// GET Following posts
const getFollowingPosts = async (req, res) => {
  const userId = req.user._id

  try {
    const user = await User.findById(userId)

    const followingPosts = await Post.find({user: {$in: user.following}})
      .sort({createdAt: -1})

    res.status(200).json(followingPosts)
  } 
  catch (error) {
    console.log('Error in getFollowingPosts controller', error.message)
    res.status(400).json({error: error.message})
  }
} 

// GET User posts
const getUserPosts = async (req, res) => {
  const { username } = req.params

  try {
    const user = await User.findOne({username})

    if(!user) {
      return res.status(400).json({error: 'User not found'})
    }

    const posts = await Post.find({user: user._id}).sort({createdAt: -1}).populate({
      path: 'user',
      select: '-password'
    })
    
    res.status(200).json(posts)
  } 
  catch (error) {
    console.log('Error in getUserPosts controller', error.message)
    res.status(400).json({error: error.message})
  }
}

// GET liked posts
const getLikedPosts = async (req, res) => {
  const { username } = req.params 

  try {
    const user = await User.findOne({username})

    const likedPosts = await Post.find({_id: {$in: user.likedPosts}}).populate({
      path: 'user',
      select: '-password'
    })

    res.status(200).json(likedPosts)
  } 
  catch (error) {
    console.log('Error in getLikedPost controller', error.message)
    res.status(400).json({error: error.message})
  }
}

// Create Post 
const createPost = async (req, res) => {
  const { text } = req.body
  const userId = req.user._id

  try {
    const user = await User.findById(userId)  
    
    if(!user) {
      return res.status(400).json({error: 'User not found'})
    }
    if(text.length === 0) {
      return res.status(400).json({error: 'You must write something first'})
    }

    const post = await Post.create({user: userId, text})
    res.status(200).json({message: 'Post created', post})
  } 
  catch (error) {
    console.log('Error in createPost controller', error.message)
    res.status(400).json({error: error.message})
  }
}

// DELETE Post
const deletePost = async (req, res) => {
  const { id } = req.params

  try {
    const post = await Post.findByIdAndDelete(id)

    if(!post) {
      return res.status(400).json({error: 'Post not found'})
    }

    res.status(200).json({message: 'Post deleted success'})
  } 
  catch (error) {
    console.log('Error in deletePost controller', error.message)
    res.status(400).json({error: error.message})
  }
}

// Like Post
const likePost = async (req, res) => {
  const userId = req.user._id
  const { id } = req.params 

  try {
    const post = await Post.findById(id)

    if(!post) {
      return res.status(400).json({error: 'Post not found'})
    }

    const isLiked = post.likes.includes(userId) 

    if(isLiked) {
      await Post.findByIdAndUpdate(id, {$pull: {likes: userId}})
      await User.findByIdAndUpdate(userId, {$pull: {likedPosts: id}})
      res.status(200).json({message: 'Post has been unliked'})
    } else {
      await Post.findByIdAndUpdate(id, {$push: {likes: userId}})
      await User.findByIdAndUpdate(userId, {$push: {likedPosts: id}})
      // Send notification
      await Notification.create({
        from: userId,
        to: post.user,
        type: 'like'
      })
      res.status(200).json({message: 'Post has been liked'})
    }
  } 
  catch (error) {
    console.log('Error in likePost controller', error.message)
    res.status(400).json({error: error.message})
  }
}

// Comment Post
const commentPost = async (req, res) => {
  const userId = req.user._id
  const { id } = req.params
  const { text } = req.body

  try {
    const post = await Post.findById(id)

    post.comments.push({user: userId, text})
    post.save()

    res.status(200).json({message: 'Comment on post success'})
  } 
  catch (error) {
    console.log('Error in commentPost controller', error.message)
    res.status(400).json({error: error.message})
  }
}

module.exports = { getAllPost, getFollowingPosts, getLikedPosts, getUserPosts, createPost, deletePost, likePost, commentPost }