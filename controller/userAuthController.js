
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../model/UserDB.js'

export const loginController = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    try {
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return res.status(400).json({ message: 'User not found', success: false })
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password)
        if (!isPasswordMatched) {
            return res.status(400).json({ message: 'Password is Invalid', success: false })
        }

        // generate JWT Login Token
        const token = jwt.sign(
            { id: user.id },
            process.env.SECRETE_KEY,
            { expiresIn: '2h' }
        )
        res.status(200).json({ success: true, message: 'Login Successfully..', token: token, })
    } catch (error) {
        console.log(`Error while login ${error.message}`)
        res.status(500).json({ message: 'Something wrong while login', error: error, success: false })
    }
}

export const signUpController = async (req, res) => {
    const { name, email, password, role, phoneNumber } = req.body

    if (!name || !email || !password || !phoneNumber) {
        return res.status(400).json({ message: 'Please fill all field are required', })
    }
    try {
        const exitingUser = await User.findOne({ where: { email } })
        if (exitingUser) {
            return res.status(400).json({ message: 'Email already exits', data: email })
        }
        const noOfDigits = 10
        const hashedPassword = await bcrypt.hash(password, noOfDigits)

        // create user
        const user = await User.create({
            name: name,
            password: hashedPassword,
            email: email,
            phoneNumber: phoneNumber,
            role: role
        })

        // Generate JWT Token
        const token = jwt.sign(
            { id: user.id },
            process.env.SECRETE_KEY,
            { expiresIn: '2h' }
        )

        res.status(201).json({ success: true, message: 'User registered successfully', token: token, data: user })
    } catch (error) {
        console.log(`Error while signup: ${error.message}`)
        res.status(500).json({ success: false, message: 'Something went wrong while registring the user', error: error })
    }
}

// get profile

//update profile

//delete profile (Admin)