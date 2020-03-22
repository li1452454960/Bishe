const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    mb_name: {type: String },
    mb_mobile: {type: String },
    mb_email: {type: String },
    date: {type:Date,default:Date.now}  ,
    

})

module.exports = mongoose.model('member', schema)