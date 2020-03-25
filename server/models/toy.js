const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    ty_id: {type: String },//编号
    ty_name: {type: String },
    pictures:[{
        ty_position: {type: String },
        ty_icon: {type: String },
        
    }],
    
    parent: {type: mongoose.SchemaTypes.ObjectId,ref: 'toyType'},
    ty_price: {type: Number },
    ty_number: {type: Number},
    ty_time: {type: Number},

    ty_brand: {type: String },//品牌
    ty_age: [{type: String }],//适用年龄
    ty_warranty: {type: String },//保修期
    ty_model: {type: String },//颜色分类
    

})

module.exports = mongoose.model('toy', schema)