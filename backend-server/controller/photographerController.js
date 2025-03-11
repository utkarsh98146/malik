import { Client } from "../model/ClientDB.js";
import { Photographer } from "../model/PhotoGrapherDB.js";
import { Task } from "../model/TaskAssignmentDB.js";

// viewTask to photographer
export const viewTask = async (req, res) => {
    try {
        const { photographerId } = req.user.userId
        if (!photographerId) {
            return res.status(403).json({ success: false, message: 'Photographer Id not fetched from token' })
        }
        console.log(`Photographer id ${photographerId}`);

        const tasks = await Task.findAll({
            where: { photographerId },
            include: [
                {
                    model: Client,
                    attributes: ['clientName']
                },
                {
                    model: Photographer,
                    attributes: ['photoshootDate', 'status'],
                }
            ],
            attributes: ['taskId', 'deliveryDate']
        });
        console.log(`All task photographer has to do ${tasks}`);

        res.status(200).json({ message: 'All task photographer has to do', success: true, data: tasks })
    }
    catch (error) {
        console.log(`Error while fetching the photographer task ${error.message}`)
        res.status(500).json({ message: 'Error while fetching the photographer task', success: false, error: error.message })
    }
}

// updateTaskStatus by photographer
export const updateTaskStatus = async (req, res) => {
    try {
        const { photographerId } = req.user.userId
        if (!photographerId) {
            return res.status(403).json({ success: false, message: 'Photographer Id not fetched from token' })
        }
        console.log(`Photographer id ${photographerId}`);

        const taskId = req.params.taskId
        const { uploadLink } = req.body
        if (!uploadLink || !taskId) {
            return res.status(400).json({ success: false, message: 'Please provide upload link and task id' })
        }
        console.log(`Task id ${taskId} and upload link ${uploadLink}`);

        const task = await Photographer.findOne({ where: { taskId, photographerId } })
        if (!task) {
            return res.status(404).json({ success: false, message: 'Photographer not found' })
        }
        task.uploadImageLink = uploadLink
        task.status = 'Completed'
        await task.save()

        res.status(200).json({
            message: 'Task status updated successfully', success: true, data: photographer
        })
    } catch (error) {
        console.log(`Error while updating the task status ${error.message}`)
        res.status(500).json({
            message: 'Error while updating the task status', success: false, error: error
        })
    }
}