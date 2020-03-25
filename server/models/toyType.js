const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    tyt_name: {type: String },
    tyt_describe: {type: String },
    date: {type:Date,default:Date.now},
    
    

})

module.exports = mongoose.model('toyType', schema)