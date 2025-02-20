export const verifyToken = async (req, res) => {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {

    }
}
/*
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authenticateToken = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Attach user data to request object
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
};


*/