const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    tyt_name: {type: String ,required:true},
    tyt_describe: {type: String ,required:true},
    date: {type:Date,default:Date.now},
    
    

})

module.exports = mongoose.model('toyType', schema)