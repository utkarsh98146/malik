import express from 'express'
import { getAllTask, updateReceiverStatus } from '../controller/receiverController.js'
import { verifyTokenService } from '../middleware/verifyToken.js'

const router = express.Router()

// all task view 

router.get('/getAllReceiverTask', verifyTokenService, getAllTask)
router.put('/receiverTaskStatus/:taskId', verifyTokenService, updateReceiverStatus)


export const receiverRouter = router