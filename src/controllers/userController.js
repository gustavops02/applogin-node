const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function generateToken(parameter = {}) {
    return jwt.sign(parameter, process.env.SECRET_HASH, {
        expiresIn: 86400
    })
}

const register = async function (req, res) {

    const { email, username } = req.body
    try {
        const user = await User.create(req.body)
        user.password = undefined
        res.send({
            user,
            token: generateToken({ id: user.id })
        })

    } catch (err) {

        if (await User.findOne({ username })) {
            return res.status(400).send({ error: 'username already exists' })

        } else if (await User.findOne({ email })) {
            return res.status(400).send({ error: 'email already exists' })

        }
        return res.status(400).send({ error: 'Registration failed' })
    }
}

const login = async function (req, res) {

    const { username, password } = req.body
    try {
        const user = await User.findOne({ username }).select('+password')

        if (!user) {
            return res.status(400).send({ error: 'User not found' })
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(400).send({ error: 'invalid password' })
        }

        user.password = undefined

        res.send({
            user,
            token: generateToken({ id: user.id })
        })


    } catch (err) {
        res.status(400).send({ error: 'Log in failed' })
    }

}

module.exports = { register, login }