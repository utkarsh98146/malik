import express from 'express'
import { loginController } from '../../controller/userAuthController.js'
import { verifyToken } from '../../middleware/verifyToken.js'

const router = express.Router()

router.post('/login', verifyToken, loginController)

export const userAuthRouter = router