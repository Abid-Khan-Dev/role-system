import jwt from 'jsonwebtoken'


export default (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) res.status(401).json({ msg: 'Token is required' })
        const decoded = jwt.verify(token, 'ak@1234')
        console.log(decoded);
        const { userId, role } = decoded
        req.user = { userId, role };
        next()
    } catch (error) {
        return res.status(401).json(error.message)
    }
}