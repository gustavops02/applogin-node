const express = require('express')
const authController = require('../controllers/authController')
const authMiddleware = require('../middlewares/auth')

const router = express.Router()

// authenticate middleware runs here...!

router.use(authMiddleware)


router.get('/', function (req, res) {
    res.send({ ok: true, id: req.userId })
})
module.exports = router