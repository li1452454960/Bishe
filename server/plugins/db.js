module.exports = app => {
    const mongoose = require('mongoose')
    mongoose.connect('mongodb://127.0.0.1:27017/node-bishe', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    mongoose.connection.once("open", function() {
        console.log('数据库连接成功~~~')
    })
    mongoose.connection.once("close", function() {
        console.log('数据库连接已断开~~~')
    })
}