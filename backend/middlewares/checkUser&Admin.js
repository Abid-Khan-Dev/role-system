
export default (req, res, next) => {
    if (req.user.role !== 'admin' && req.user.role !== 'user') {
        return res.status(400).json({ msg: 'Role is Required' });
    }
    next()
}