const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    ust_name: {type: String },
    ust_describe: {type: String },
    ust_time: {type: Number},
    
    

})

module.exports = mongoose.model('userType', schema)