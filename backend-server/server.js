import express from 'express'
import dotenv from 'dotenv'
import { sequelize } from './config/dbConnection.js'
import cors from 'cors'
import { receiverRouter } from './routes/receiverRoute.js'
import { userAuthRouter } from './routes/userAuth.js'
import { adminRouter } from './routes/adminRoute.js'
import { photographerRouter } from './routes/photographerRouter.js'
import { editorRouter } from './routes/editorRoute.js'
import "./config/modelCreation.js"

dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// router
app.use('/userAuth', userAuthRouter)  // auth routes
app.use('/receiver', receiverRouter) // receiver routes
app.use('/admin', adminRouter)      // admin routes
app.use('/photographer', photographerRouter) // photographer routes 
app.use('/editor', editorRouter) // editor routes


const PORT = process.env.PORT || 3000



app.listen(PORT, (req, res) => {
    console.log(`Server started at http://localhost:${PORT}`)
})
// sequelize.sync({ alter: true }) // update srtructure if needed
//     .then(() => {
//         console.log(`Conncetion established successfully..`)
//     }).catch((err) => {
//         console.log(`connection failed due to ${err}`)
//     })
