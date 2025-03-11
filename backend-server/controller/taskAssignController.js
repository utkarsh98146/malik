import { Task } from "../model/TaskAssignmentDB.js"
import { User } from "../model/UserDB.js"
import { Client } from "../model/ClientDB.js"
import pkg from 'body-parser';
const { raw } = pkg;


// Create task assign controller
export const taskAssignController = async (req, res) => {
    try {
        const adminId = req.user.userId
        const admin = await User.findOne({ where: { userId: adminId } })
        if (!admin || admin.role !== 'Admin') {
            return res.status(403).json({ success: false, message: 'Unauthorized person! Only admin can assign task.' })
        }
        const { clientId, productName, stockCount, modelAssigned, photoshootDate, deliveryDate, receiverId, photographerId, editorId, currentStatus, photoshootStatus } = req.body
        const task = await Task.create({
            clientId: clientId,
            productName: productName,
            stockCount: stockCount,
            modelAssigned: modelAssigned,
            photoshootDate: photoshootDate,
            deliveryDate: deliveryDate,
            receiverId: receiverId,
            photographerId: photographerId,
            editorId: editorId,
            status: currentStatus || 'Assigned',
            adminId: adminId,
            photoshootStatus: photoshootStatus || 'Pending'
        })

        const taskWithClient = await Task.findOne({
            where: { taskId: task.taskId },
            include: [{ model: Client, attributes: ['clientName'] }]
        })
        console.log(`taskWithClient`, taskWithClient.toJSON())
        console.log(`task.editorId`, task.editorId)
        const editorIds = (task.editorId);
        console.log(`editorIds`, editorIds)
        const editors = await User.findAll({
            where: { userId: editorIds },
            attributes: ['userId', 'name']
        });
        const editorNames = editors.map(editor => editor.name).join(', ');
        const responseTask = {
            ...taskWithClient.toJSON(),
            clientName: taskWithClient.ClientDB.clientName,
            editorName: editorNames
        }
        if (!task) {
            return res.status(400).json({ success: false, message: 'Error while assigning task' })
        }
        res.status(201).json({ success: true, message: 'Task assigned successfully', task: responseTask })
    } catch (error) {
        console.log(`Error while assigning task ${error}`);
        res.status(500).json({ success: false, message: 'Error while assigning task', error: error.message })
    }
}

// view all assigned task
export const viewTaskAssignController = async (req, res) => {
    try {
        const adminId = req.user.userId
        const admin = await User.findOne({ where: { userId: adminId } })
        if (!admin || admin.role !== 'Admin') {
            return res.status(403).json({ success: false, message: 'Unauthorized person! Only admin can view assigned task.' })
        }
        const tasks = await Task.findAll({
            include: [
                { model: Client, attributes: ['clientName', 'clientPhone'] },
                { model: Receiver, attributes: ['receiverName', 'receiverPhone'] },
                { model: Photographer, attributes: ['photographerName', 'photographerPhone'] },
                { model: Editor, attributes: ['editorName', 'editorPhone'] }
            ]
        })
        if (!tasks) {
            return res.status(400).json({ success: false, message: 'Error while fetching task' })
        }
        res.status(200).json({ success: true, message: 'Task fetched successfully', tasks })
    } catch (error) {
        console.log(`Error while fetching task ${error}`);
        res.status(500).json({ success: false, message: 'Error while fetching task', error: error.message })
    }
}

export const getAllAssignedTask = async (req, res) => {
    try {
        const adminId = req.user.userId
        const admin = await User.findOne({ where: { userId: adminId } })
        if (!admin || admin.role !== 'Admin') {
            return res.status(403).json({ success: false, message: 'Unauthorized person! Only admin can view assigned task.' })
        }
        const tasks = await Task.findAll({
            where: { adminId: adminId },
            include: [
                { model: User, attributes: ['name'] },
                { model: Client, attributes: ['clientName'] },
            ],
            raw: true,
            nest: true
        });

        for (const task of tasks) {
            const editorIds = task.editorId;
            console.log(`editorIds`, editorIds);
            const editors = await User.findAll({
                where: { userId: editorIds },
                attributes: ['userId', 'name']
            });
            const editorNames = editors.map(editor => editor.name).join(', ');
            task.editorNames = editorNames;
        }
        const formattedTasks = tasks.map(task => ({
            ...task,
            reveiverName: task.UserDB.name || null,  // Extract name from User
            clientName: task.ClientDB?.clientName || null  // Extract clientName from Client
        }));

        if (!tasks) {
            return res.status(400).json({ success: false, message: 'Error while fetching task' })
        }
        res.status(200).json({ success: true, message: 'Task fetched successfully', tasks: formattedTasks })
    } catch (error) {
        console.log(`Error while fetching task ${error}`);
        res.status(500).json({ success: false, message: 'Error while fetching task', error: error.message })
    }
}