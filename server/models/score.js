const mongoose = require('mongoose')

const schema = new mongoose.Schema({

    parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'member', },
    mb_name: { type: String },
    sc_score: { type: Number },
    /*  sc_receive: { type: Number },
     sc_exchange: { type: Number }, */

})

module.exports = mongoose.model('score', schema)