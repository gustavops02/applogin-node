const mongoose = require('../database/data')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        select: false,
        required: true,
    },
    email: {
        unique: true,
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

userSchema.pre('save', function (next) {
    const hash = bcrypt.hashSync(this.password, 10)
    this.password = hash

    next()
})


const User = mongoose.model('User', userSchema)
module.exports = User