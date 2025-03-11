import { Task } from "../model/TaskAssignmentDB.js"
import { User } from "../model/UserDB.js"

// see all assigned task
export const getAllTask = async (req, res) => {
    try {
        // extracting the receiv er id from the token
        const receiverId = await req.user.userId
        if (!receiverId) {
            return res.status(403).json({ success: false, message: 'Receiver Id not fetched from token', error: error.message })
        }
        console.log(`Receiver id ${receiverId}`);

        // checking if the receiver is present in the database
        const receiver = await User.findOne({ where: { userId: receiverId, role: 'Receiver' } })
        if (!receiver || receiver.role !== 'Receiver') {
            return res.status(403).json({ success: false, message: 'Unauthorized person! Only receiver can view task' })
        }
        console.log(`Receiver found: ${receiver}`);

        const tasks = await Task.findAll({ where: { taskId: receiverId } })
        console.log(`All task reciver has to do ${tasks}`);

        res.status(200).json({ message: 'All task reciver has to do', success: true, data: tasks })
    } catch (error) {
        console.log(`Error while fetching the receiver task ${error.message}`)
        res.status(500).json({ message: 'Error while fetching the receiver task', success: false, error: error.message })
    }
}

// update the reciever status
export const updateReceiverStatus = async (req, res) => {

    try {
        const receiverId = req.user.userId
        const { taskId } = req.params
        const { status } = req.body

        // checking if the receiver is present in the database
        const receiver = await User.findOne({ where: { userId: receiverId } })

        if (!receiver || receiver.role !== 'Receiver') {
            return res.status(403).json({ success: false, message: 'Unauthorized person! Only receiver can update status' })
        }
        if (!taskId || !status) {
            return res.status(400).json({ message: 'Task Id and status is required', success: false })
        }

        const task = await Task.findOne({ where: { taskId, receiverId } });

        if (!task) {
            console.log(`Task not found ${task}`)
            return res.status(404).json({ message: 'Task not found' })
        }
        task.status = status
        await task.save()
        res.status(200).json({ message: 'Task status updated successfully..', success: true, data: task })
    } catch (error) {
        console.log(`Error while updating task status ${error}`)
        res.status(500).json({ message: 'Error while updating status', error: error.message })
    }
}
