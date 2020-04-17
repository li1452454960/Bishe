const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    ty_id: { type: String }, //编号
    pictures: [{
        ty_position: { type: String },
        ty_icon: { type: String },

    }],
    parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'stock' },
    ty_price: { type: Number },
    date: { type: Date, default: Date.now },
    ty_parameter: [{ type: String }], //型号大小
    ty_model: [{ type: String }], //颜色分类
    ty_brand: { type: String }, //品牌
    ty_age: [{ type: String }], //适用年龄
    ty_warranty: { type: String }, //保修期
    ty_describe: { type: String },


})

module.exports = mongoose.model('toy', schema)