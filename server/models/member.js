const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    mb_id: { type: String, },
    mb_name: { type: String, },
    mb_sex: { type: String, },
    mb_age: { type: Number },
    mb_hobby: { type: String },
    mb_mobile: { type: String, },
    mb_email: { type: String, },
    mb_grade: { type: String, },
    state: { type: Boolean },
    date: { type: Date, default: Date.now },


})

module.exports = mongoose.model('member', schema)