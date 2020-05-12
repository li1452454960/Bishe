module.exports = app => {
    const mongoose = require('mongoose')
        /* mongoose.connect('mongodb://root:123456@120.24.27.207:27017/node-bishe?authSource=admin', { */
    mongoose.connect('mongodb://localhost:27017/node-bishe', {
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