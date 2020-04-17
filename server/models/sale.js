const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    mb_id: { type: String, },
    sl_id: { type: String },
    sl_name: { type: String },
    sl_number: { type: Number },
    sl_unit: { type: String },
    ty_price: { type: Number },
    sl_totalPrice: { type: Number },
    sl_payType: { type: String },
    sl_payment: { type: String },
    sl_delivery: { type: String },
    sl_receive: { type: String },
    date: { type: Date, default: Date.now },
    parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'member' },


})

module.exports = mongoose.model('sale', schema)