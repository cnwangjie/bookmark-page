var mongoose = require('mongoose')
var CateSchema = new mongoose.Schema({
    name: String,
    description: String,
    sum: Number,
    weight: Number,
})

CateSchema.statics = {
}

var Cate = mongoose.model('Cate', CateSchema);
module.exports = Cate
