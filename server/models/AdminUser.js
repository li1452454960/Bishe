const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: { type: String, required: true },
    password: {
        type: String,
        select: false,
        set(val) {
            return require('bcryptjs').hashSync(val, 10)
        },
        required: true
    },
    icon: { type: String },
    identity: { type: String, required: true },
    state: { type: Boolean },
    date: { type: Date, default: Date.now },

})

module.exports = mongoose.model('AdminUser', schema)