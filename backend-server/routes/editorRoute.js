import express from 'express'
import { updateTaskStatus, viewTask, getAllEditors } from '../controller/editorController.js'
import { verifyTokenService } from '../middleware/verifyToken.js'

const router = express.Router()

// viewTask to editor
router.get('/viewTask', verifyTokenService, viewTask)
router.get('/getAllEditors', verifyTokenService, getAllEditors)

// updateTaskStatus by editor
router.put('/updateTaskStatus/:taskId', verifyTokenService, updateTaskStatus)

export const editorRouter = router