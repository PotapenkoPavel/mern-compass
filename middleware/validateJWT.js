const config = require('config')
const jwt = require('jsonwebtoken')

const validateJWT = async (req, res, next) => {
    try {
        const token = req.headers['auth-token']
        req.userData = jwt.verify(token, config.get('JWT-Secret'))
        next()
    } catch(e) {
        res.status(401).json({ message: e.message })
    }    
}

module.exports = validateJWT