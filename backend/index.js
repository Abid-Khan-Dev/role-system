import cookieParser from 'cookie-parser'
import express from 'express'
import connectDB from './config/connectDB.js'
import User from './models/User.js'
import jwt from 'jsonwebtoken'
import checkToken from './middlewares/checkToken.js';
import cors from 'cors'
import checkIsAdmin from './middlewares/checkIsAdmin.js'

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
connectDB()
const mykeyForToken = 'ak@1234';



app.get('/', checkToken, (req, res) => {
    console.log('Working');
    const someData = 'some Data From Backend'
    return res.status(200).json({ someData })
})

app.post('/signup', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        console.log(req.body);

        if (!name || !email || !password || !role) {
            return res.status(400).json({ msg: 'All fields are Required' })
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ msg: 'User is found.' })

        const newUser = await User.create({
            name, email, password, role
        })
        const token = jwt.sign({ userId: newUser._id, role: newUser.role }, mykeyForToken)
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict'
        })
        return res.status(200).json({ msg: 'Account is created successfully' })
    } catch (error) {
        return res.status(500).json(error.message)
    }
})


app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ msg: 'All fields are Required' })
        }

        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(400).json({ msg: 'User is not found.' })

        if (existingUser.password !== password) return res.status(400).json({ msg: 'Password is incorrect' })

        const token = jwt.sign({ userId: existingUser._id, role: existingUser.role }, mykeyForToken)
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict'
        })
        return res.status(200).json({ msg: 'Logged in successfully' })
    } catch (error) {
        return res.status(500).json(error.message)
    }
})


app.get('/me', checkToken, async (req, res) => {
    const user = await User.findById(req.user.userId).select('-password')
    return res.status(200).json({ user })
})

app.get('/logout', checkToken, async (req, res) => {
    res.clearCookie('token')
    return res.status(200).json({ msg: 'Logout successfully' })
})
app.listen(3000)