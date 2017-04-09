const mongoose = require('mongoose')
const Item = require('./models/item.js')
const Cate = require('./models/cate.js')
const db = mongoose.connect('mongodb://127.0.0.1:27017/bm')
const fs = require('fs')

let item = JSON.parse(fs.readFileSync('./bmdata/aitem.json'))
let cate = JSON.parse(fs.readFileSync('./bmdata/cate.json'))

item.map((i) => {
    for (let n in cate) {
        if (cate[n].name == i.cate) {
            if (typeof cate[n].sum != 'number') {
                cate[n].sum = 1
            } else {
                cate[n].sum += 1
            }
        }
    }
    Item.findOne({name: i.name}, (err, r) => {
        if (r) {

        } else {
            Item.create({
                name: i.name,
                link: i.link,
                icon: i.icon,
                description: i.description,
                add_time: i.date,
                cate: i.cate,
            })
        }
    })
})
cate.map((i) => {
    Cate.findOne({name: i.name}, (err, r) => {
        if (r) {

        } else {
            Cate.create({
                name: i.name,
                sum: i.sum,
                description: i.description ? i.description : '',
            })
        }
    })
})
