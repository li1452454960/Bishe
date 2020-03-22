const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    tyt_name: {type: String },
    tyt_describe: {type: String },
    tyt_time: {type: Number},
    
    

})

module.exports = mongoose.model('toyType', schema)