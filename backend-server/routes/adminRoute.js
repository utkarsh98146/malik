import express from 'express'
import { addClient, viewAllClient, viewAllEditorList, viewAllPhotographer, viewAllReceiver } from '../controller/adminController.js'
import { taskAssignController, getAllAssignedTask } from '../controller/taskAssignController.js'
import { verifyTokenService } from '../middleware/verifyToken.js'
import { getAllTask } from '../controller/receiverController.js'

const router = express.Router()

// view client list
router.get('/viewAllClient', verifyTokenService, viewAllClient)

// add client
router.post('/addClient', verifyTokenService, addClient)

// view all editor
router.get('/viewAllEditor', verifyTokenService, viewAllEditorList)

// view photographer list
router.get('/viewAllPhotographer', verifyTokenService, viewAllPhotographer)

// view al receiver list
router.get('/viewAllReceiver', verifyTokenService, viewAllReceiver)



// assign task to all
router.post('/assign-task', verifyTokenService, taskAssignController)

// view all assigned task
router.get('/view-assigned-task', verifyTokenService, getAllAssignedTask)



export const adminRouter = router