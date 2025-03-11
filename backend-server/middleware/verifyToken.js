import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
dotenv.config()


export const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization']
    if (!bearerHeader) {
        return res.status(401).json({ message: 'Token not received', success: false })
    }

    const token = bearerHeader.split(' ')[1]
    // console.log(`Token ${token}`)
    jwt.verify(token, process.env.SECRETE_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token', success: false })
        }
        console.log(`
            decoded ${JSON.stringify(decoded)}
        `)

        if (!decoded || !decoded.userId || !decoded.role) {
            return res.status(403).json({ message: 'Invcsalid token', success: false })
        }
        console.log(`decoded ${decoded.userId} ${decoded.role
            }`);

        req.user = { userId: decoded.userId, role: decoded.role }
        console.log(`User ${req.user.userId} and ${req.user.role}`);

        next()
    })
}

export const verifyTokenService = verifyToken


