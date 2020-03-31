const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    mb_name: {type: String ,required:true},
    mb_sex: {type: String ,required:true},
    mb_age: {type: Number },
    mb_hobby: {type: String },
    mb_mobile: {type: String ,required:true},
    mb_email: {type: String ,required:true},
    mb_state: {type: Number },
    date: {type:Date,default:Date.now}  ,
    

})

module.exports = mongoose.model('member', schema)