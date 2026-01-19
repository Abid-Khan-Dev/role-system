

export default (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(400).json({ msg: 'You are not an admin' })
    }
    next()
}