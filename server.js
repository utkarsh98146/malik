import express from 'express'
import dotenv from 'dotenv'
import { userAuthRouter } from './routes/authRoute/userAuth.js'


dotenv.config()

const app = express()

// router
app.post('/auth', userAuthRouter)
