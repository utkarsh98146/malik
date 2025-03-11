import express from 'express'
import { verifyTokenService } from '../middleware/verifyToken.js'
import { updateTaskStatus, viewTask } from '../controller/photographerController.js'

const router = express.Router()

// viewTask to photographer
router.get('/viewTask', verifyTokenService, viewTask)

// updateTaskStatus by photographer
router.put('/updateTaskStatus/:taskId', verifyTokenService, updateTaskStatus)

export const photographerRouter = router