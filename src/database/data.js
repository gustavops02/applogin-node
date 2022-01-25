const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URL_ACCESS).then(data => {
    console.log("MongoDB's running")
})

module.exports = mongoose