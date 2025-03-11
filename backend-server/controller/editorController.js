import { where, Op } from "sequelize";
import { Client } from "../model/ClientDB.js";
import { Editor } from "../model/EditorDB.js";
import { Task } from "../model/TaskAssignmentDB.js";
import { User } from "../model/UserDB.js";
import Sequelize from 'sequelize'
export const viewTask = async (req, res) => {
    try {
        let editorId;
        if (req.user.role !== 'Editor') {
            editorId = req.query.editorId;

        }
        else {
            editorId = req.user.userId

        }
        if (!editorId) {
            return res.status(403).json({ success: false, message: 'Editor Id not fetched from token' })
        }
        console.log(`Editor id ${editorId}`);
        const tasks = await User.findAll({
            where: Sequelize.literal(`JSON_CONTAINS(editorId, '"${editorId}"')`)
        });

        /*
        // const tasks = await Task.findAll({
        //     where: {
        //         editorId: {
        //             [Op.in]: Array.isArray(editorId)
        //                 ? editorId.map(id => id.replace(/['"]+/g, ''))  // Remove extra quotes
        //                 : [editorId.replace(/['"]+/g, '')] // Ensure it's a valid array
        //         }

        //     },
        //     // include: [
        //     //     // {
        //     //     //     model: Client,
        //     //     //     attributes: ['clientName', 'deliveryDate']
        //     //     // },
        //     //     {
        //     //         model: User,
        //     //         attrributes: ['name', 'status'],

        //     //     }
        //     // ]
        //     // ,
        //     // attributes: ['taskId']
        // })
        */
        if (!tasks || tasks.lenght === 0) {
            return res.status(404).json({ success: false, message: 'No task found for editor' })
        }
        console.log(`All task editor has to do ${tasks}`);

        res.status(200).json({ message: 'All task editor has to do', success: true, data: tasks })
    } catch (error) {
        console.log(`Error while fetching the editor task ${error.message}`)
        res.status(500).json({ message: 'Error while fetching the editor task', success: false, error: error.message })
    }

}

export const updateTaskStatus = async (req, res) => {
    try {
        const editorId = req.user.userId
        if (!editorId) {
            return res.status(403).json({ success: false, message: 'Editor Id not fetched from token' })
        }
        console.log(`Editor id ${editorId}`);

        const taskId = req.params.taskId
        const { uploadLink } = req.body
        if (!uploadLink || !taskId) {
            return res.status(400).json({ success: false, message: 'Please provide upload link and task id' })
        }
        console.log(`Task id ${taskId} and upload link ${uploadLink}`);

        const task = await Editor.findOne({ where: { taskId, editorId } })
        if (!task) {
            return res.status(404).json({ success: false, message: 'Editor not found' })
        }
        task.uploadImageLink = uploadLink
        task.status = 'Completed'
        await task.save()

        res.status(200).json({
            message: 'Task status updated successfully',
            success: true,
            data: task
        })
    } catch (error) {
        console.log(`Error while updating the task status ${error.message}`)
        res.status(500).json({ message: 'Error while updating the task status', success: false, error: error.message })
    }
}


export const getAllEditors = async (req, res) => {
    try {
        const editors = await User.findAll({
            where: { role: 'Editor' },

        })
        if (!editors || editors.lenght === 0) {
            return res.status(404).json({ success: false, message: 'No editor found' })
        }
        res.status(200).json({ message: 'All editor fetched successfully', success: true, data: editors })
    } catch (error) {
        console.log(`Error while fetching all editor ${error.message}`)
        res.status(500).json({ message: 'Error while fetching all editor', success: false, error: error.message })
    }
}