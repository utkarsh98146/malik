import { Client } from "../model/ClientDB.js"
import { User } from "../model/UserDB.js"

// view all client list
export const viewAllClient = async (req, res) => {
    try {
        const adminId = req.user.userId
        console.log(`Admin id : ${adminId}`)
        const admin = await User.findOne({ where: { userId: adminId } })
        if (!admin || admin.role !== 'Admin') {
            return res.status(403).json({ success: false, message: 'Unauthorized person! Only admin can view clients.' })
        }
        const clientList = await Client.findAll({ where: { adminId: adminId } })
        res.status(200).json({ success: true, message: 'All clients data fetched..', data: clientList })
    } catch (error) {
        console.log(`Error while fetching the client list ${error}`);
        res.status(500).json({ success: false, message: 'Error while fetching client list', error: error.message })
    }
}


// add new client
export const addClient = async (req, res) => {

    try {
        const adminId = req.user.userId
        const { clientName, phoneNumber, address, GSTNumber } = req.body
        if (!clientName || !phoneNumber || !address || !GSTNumber) {
            return res.status(400).json({ message: 'All field are required,Please enter all required field', success: false })
        }
        const admin = await User.findOne({ where: { userId: adminId, role: 'Admin' } })
        if (!admin || admin.role !== 'Admin') {
            return res.status(403).json({ success: false, message: 'Unauthorized access! Only admin can add client' })
        }
        console.log("body", req.user.userId, adminId)

        const client = await Client.create({
            clientName: clientName,
            phoneNumber: phoneNumber,
            address: address,
            GSTNumber: GSTNumber,
            adminId: adminId
        })
        res.status(201).json({ success: true, message: 'Client added successfully', data: client })
    } catch (error) {
        console.log(`Error while adding new client ${error.message}`);
        res.status(500).json({ success: false, message: 'Error while adding new client', error: error.message })

    }

}

//view editor list
export const viewAllEditorList = async (req, res) => {
    try {
        const adminId = req.user.userId
        const admin = await User.findOne({ where: { userId: adminId } })
        if (!admin || admin.role !== 'Admin') {
            return res.status(403).json({ success: false, message: 'Unauthorized person! Only admin can view editors.' })
        }
        const editorList = await User.findAll({ where: { role: 'Editor' } })
        res.status(200).json({ success: true, message: 'All editors data fetched..', data: editorList })
    } catch (error) {
        console.log(`Error while fetching the editor list ${error}`);
        res.status(500).json({ success: false, message: 'Error while fetching editor list', error: error.message })
    }
}


//view all receiver List
export const viewAllReceiver = async (req, res) => {
    try {
        const adminId = req.user.userId
        const admin = await User.findOne({ where: { userId: adminId, role: 'Admin' } })
        if (!admin || admin.role !== 'Admin') {
            return res.status(403).json({ success: false, message: 'Unauthorized person! Only admin can view receiver.' })
        }
        const receiverList = await User.findAll({ where: { role: 'Receiver' } })
        res.status(200).json({ success: true, message: 'All receivers data fetched..', data: receiverList })
    } catch (error) {
        console.log(`Error while fetching the receiver list ${error}`);
        res.status(500).json({ success: false, message: 'Error while fetching receiver list', error: error.message })
    }
}

//view all photographer List
export const viewAllPhotographer = async (req, res) => {
    try {
        const adminId = req.user.userId
        const admin = await User.findOne({ where: { userId: adminId, role: 'Admin' } })
        if (!admin || admin.role !== 'Admin') {
            return res.status(403).json({ success: false, message: 'Unauthorized person! Only admin can view photographer.' })
        }
        const photographerList = await User.findAll({ where: { role: 'Photographer' } })
        res.status(200).json({ success: true, message: 'All photographer data fetched..', data: photographerList })
    } catch (error) {
        console.log(`Error while fetching the photographer list ${error}`);
        res.status(500).json({ success: false, message: 'Error while fetching photographer list', error: error.message })
    }
}