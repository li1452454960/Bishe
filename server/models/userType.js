const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    ust_name: {type: String },
    ust_describe: {type: String },
    date: {type:Date,default:Date.now},
    
    

})

module.exports = mongoose.model('userType', schema)