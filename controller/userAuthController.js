export const loginController = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(403).json({ message: 'Please fill both email and password' })
    }
}

export const signUpController = async (req, res) => {

}