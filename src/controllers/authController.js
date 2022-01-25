
const User = require('../models/User')

const hello = function (req, res) {
    res.send({ ok: true, id: req.userId })
}

module.exports = { hello }