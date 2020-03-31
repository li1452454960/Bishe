const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    st_id: {type: String },//编号
    st_name: {type: String ,required:true},
    st_stock: {type: Number ,required:true},
    st_unit: {type: String ,required:true},
    st_number: {type: Number },
    date: {type:Date,default:Date.now},
   

})

module.exports = mongoose.model('stock', schema)