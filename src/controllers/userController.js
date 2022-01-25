const User = require('../models/User')
const bcrypt = require('bcryptjs')

const register = async function (req, res) {

    const { email, username } = req.body
    try {
        const user = await User.create(req.body)
        user.password = undefined
        res.send({ user })

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


    } catch (err) {
        res.status(400).send({ error: 'Log in failed' })
    }

}

module.exports = { register }