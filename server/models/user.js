const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: {type: String },
    password: {type: String ,
    select: false,
    set(val) {
        return require('bcryptjs') .hashSync(val, 10)
    }},
    us_mobile: {type: String },
    us_email: {type: String },
    us_time: {type: Number},
    us_type: {type: String },
    

})

module.exports = mongoose.model('user', schema)
