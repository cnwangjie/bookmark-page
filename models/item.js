var mongoose = require('mongoose')
var ItemSchema = new mongoose.Schema({
    name: String,
    link: String,
    icon: String,
    description: String,
    add_time: Date,
    cate: String,
})

ItemSchema.statics = {
}

var Item = mongoose.model('Item', ItemSchema);
module.exports = Item
