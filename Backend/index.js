import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import globalErrorHandler from './Utils/AppError.js'
dotenv.config()
const port = process.env.PORT || 5000

const app = express()
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  })
)

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(bodyParser.json())
// const uri = 'mongodb://127.0.0.1:27017/cms_website'
const uri = process.env.MONGODB_URI

mongoose.connect(uri).then(() => {
  console.log('Connected to MongoDB')
})
import userRouter from './Module/User/user.routes.js'
import eventRouter from './Module/Event/event.routes.js'
app.use('/api/v1/user', userRouter)
app.use('/api/v1/events', eventRouter)
app.get('/', (req, res) => {
  res.send('API is running')
})
app.use(globalErrorHandler)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

export default app
