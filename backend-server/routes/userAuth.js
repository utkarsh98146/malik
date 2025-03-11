import express from 'express'
import { loginController, signUpController } from '../controller/userAuthController.js'

// import { verifyToken } from '../middleware/verifyToken.js'

const router = express.Router()

router.post('/login', loginController)
router.post('/signUp', signUpController)

export const userAuthRouter = router