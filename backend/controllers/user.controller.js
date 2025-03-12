const bcrypt = require('bcrypt')

// Models
const User = require('../models/user.model')
const Notification = require('../models/notification.model')

// Cloudinary
const cloudinary = require('cloudinary')

// GET profile
const getUserProfile = async (req, res) => {
  const { username } = req.params

  try {
    const user = await User.findOne({username}).select('-password').populate({
      path: 'following'
    })
    if(!user) {
      return res.status(400).json({error: 'User not found'})
    }
    res.status(200).json(user)
  }
  catch(error) {
    console.log('Error in getUserProfile controller', error.message)
    res.status(400).json({error: error.message})
  }
}

// Follow & unfollow user
const followAndUnfollowUser = async (req, res) => {
  const { id } = req.params

  try {
    const otherUser = await User.findById(id)
    const currentUser = await User.findById(req.user._id)

    if(id === req.user._id.toString()) {
      return res.status(400).json({error: "You cannot follow/unfollow yourself"})
    }
    if(!otherUser || !currentUser) {
      return res.status(400).json({error: "User not found"})
    }

    const isFollowing = currentUser.following.includes(id)

    if(isFollowing) {
      // Unfollow
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } })
      await User.findByIdAndUpdate(id, { $pull: { follower: req.user._id } })
      res.status(200).json({message: 'Unfollow success'})
    }
    else {
      // Follow
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } })
      await User.findByIdAndUpdate(id, { $push: { follower: req.user._id } })

      // Send notification
      const notification = await Notification.create({
        from: req.user._id,
        to: id,
        type: 'follow'
      })

      res.status(200).json({message: 'Follow success', notification})
    }

  }
  catch(error) {
    console.log('Error in followAndUnfollowUser controller', error.message)
    res.status(400).json({error: error.message})
  }
}

// UPDATE user profile
const updateUserProfile = async (req, res) => {
  const { fullName, username, email, oldPassword, newPassword, bio } = req.body
  let { profileImg } = req.body
  const userId = req.user._id

  try {
    let user = await User.findById(userId)

    if(!userId) {
      return res.status(400).json({error: 'User not found'})
    }

    if((!oldPassword && newPassword) || (oldPassword && !newPassword)) {
      return res.status(400).json({error: 'Please provide both current and new password'})
    }

    if(oldPassword && newPassword) {
      // Match the old password
      const isMatch = await bcrypt.compare(oldPassword, user.password)

      if(!isMatch) {
        return res.status(400).json({error: 'Your old password is incorrect'})
      }

      // Hash the new password
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(newPassword, salt)
    }

    if(profileImg) {
      if(user.profileImg) {
        await cloudinary.uploader.destroy(user.profileImg.split('/').pop().split('.')[0])
      }

      const uploadedResponse = await cloudinary.uploader.upload(profileImg)
      profileImg = uploadedResponse.secure_url
    }

    user.fullName = fullName || user.fullName
    user.username = username || user.username
    user.email = email || user.email
    user.bio = bio || user.bio
    user.profileImg = profileImg || user.profileImg

    user = await user.save()
    return res.status(200).json(user)
  } 
  catch (error) {
    console.log('Error in updateUserProfile controller', error.message)
    res.status(400).json({error: error.message})
  }
}

// GET Suggested Users
const getSuggestedUsers = async (req, res) => {
  const userId = req.user._id

  try {
    const followingUsers = await User.findById(userId).select('following')  

    const users = await User.aggregate([
      { $match: { _id: {$ne: userId}} },
      { $sample: {size: 10} }
    ])

    const suggestedUsers = users.filter(user => !followingUsers.following.includes(user._id))

    res.status(200).json(suggestedUsers)
  } 
  catch (error) {
    console.log('Error in getSuggestedUsers controller', error.message)
    res.status(400).json({error: error.message})
  }
}

module.exports = { getUserProfile, followAndUnfollowUser, updateUserProfile, getSuggestedUsers }