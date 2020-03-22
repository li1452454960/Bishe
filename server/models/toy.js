const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    ty_name: {type: String },
    ty_icon: {type: String },
    parent: {type: mongoose.SchemaTypes.ObjectId,ref: 'toyType'},
    
    ty_price: {type: Number },
    ty_number: {type: Number},
    ty_time: {type: Number},
    

})

module.exports = mongoose.model('toy', schema)