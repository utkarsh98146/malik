import express from 'express'
import dotenv from 'dotenv'
import { userAuthRouter } from './routes/authRoute/userAuth.js'
import { sequelize } from './config/dbConnection.js'
import cors from 'cors'
dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// router
app.use('/userAuth', userAuthRouter)

sequelize.sync({ alter: true }) // update srtructure if needed
    .then(() => {
        console.log(`Conncetion established successfully..`)
        const PORT = process.env.PORT || 3000
        app.listen(PORT, (req, res) => {
            console.log(`Server started at http://localhost:${PORT}`)
        })
    }).catch((err) => {
        console.log(`connection failed due to ${err}`)
    })
