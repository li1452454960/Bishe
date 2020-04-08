const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    st_id: { type: String }, //编号
    st_name: { type: String, },
    st_stock: { type: Number, },
    st_unit: { type: String, },
    st_number: { type: Number },
    child: { type: mongoose.SchemaTypes.ObjectId, ref: 'toyType', },
    st_tyName: { type: String }, //玩具类型
    date: { type: Date, default: Date.now },


})

module.exports = mongoose.model('stock', schema)