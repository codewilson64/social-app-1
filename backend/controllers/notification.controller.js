const Notification = require('../models/notification.model')

// GET all notification
const getAllNotification = async (req, res) => {
  const userId = req.user._id

  try {
    const notifications = await Notification.find({to: userId})
      .populate({
        path: 'from',
        select: 'username'
      })
    await Notification.updateMany({to: userId}, {read: true})
    res.status(200).json(notifications)
  } 
  catch (error) {
    console.log('Error in getAllNotification controller', error.message)
    res.status(400).json({error: error.message})
  }
}

// DELETE all notification
const deleteAllNotification = async (req, res) => {
  const userId = req.user._id

  try {
    await Notification.deleteMany({to: userId})
    res.status(200).json({message: 'All Notification deleted'})  
  } 
  catch (error) {
    console.log('Error in deleteAllNotification controller', error.message)
    res.status(400).json({error: error.message})
  }
}

// DELETE single notification
const deleteNotification = async (req, res) => {
  const { id } = req.params

  try {
    await Notification.findByIdAndDelete(id)
    res.status(200).json({message: 'Notification deleted'})  
  } 
  catch (error) {
    console.log('Error in deleteNotification controller', error.message)
    res.status(400).json({error: error.message})
  }
}

module.exports = { getAllNotification, deleteAllNotification, deleteNotification }