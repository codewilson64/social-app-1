const express = require('express')

const protectRoute = require('../middleware/protectRoute')
const { getAllNotification, deleteAllNotification, deleteNotification } = require('../controllers/notification.controller')

const router = express.Router()

router.get('/', protectRoute, getAllNotification)
router.delete('/delete/:id', protectRoute, deleteNotification)
router.delete('/delete', protectRoute, deleteAllNotification)

module.exports = router