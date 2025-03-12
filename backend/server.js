require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const cookieParser = require('cookie-parser')
const cloudinary = require('cloudinary')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

app.use(express.json())
app.use(cors())
app.use(cookieParser())

const authRoutes = require('./routes/auth.routes')
const userRoutes = require('./routes/user.routes')
const postRoutes = require('./routes/post.routes')
const notificationRoutes = require('./routes/notification.routes')

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)
app.use('/api/notification', notificationRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Connected to db...listening on port, ${process.env.PORT}`)
    })
  })
  .catch(error => console.log(error))