const express = require('express')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const Item = require('./models/item.js')
const Cate = require('./models/cate.js')
const db = mongoose.connect('mongodb://127.0.0.1:27017/bm')
const fs = require('fs')
const ejs = require('ejs')
const app = express()

app.listen(8085)
app.engine('html', ejs.renderFile)
app.set('view engine', 'html')
app.use(cookieParser())
// let data = JSON.parse(fs.readFileSync('./bm.json'))
// let i18n = JSON.parse(fs.readFileSync('./i18n.json'))
let cates = {}
Cate.find((err, re) => {
    for (let t of re) {
        cates[t.name] = t
    }
    console.log('cates loaded!')
})

let render = function(req, res, lang, cate = 'common') {
    Item.find({cate: cate}, (err, items) => {
        res.render('content.ejs', {
            cate: cate,
            description: cates[cate].description,
            cates: cates,
            items: items,
            langs: [
                {
                    name: '中文(简体)',
                    code: 'zh_CN',
                },
            ]
        })
    })
}
app.use('/static', express.static('./static'))

app.get('/favicon.ico', (req, res) => {
    res.status(404).end()
})

app.use('*', (req, res, next) => {
    // cookie弹窗
    next()
})

app.get('/search', (req, res) => {
  let q = req.query.q ? req.query.q : null
  if (!q) {
    res.redirect('/')
    return
  }
  Item.find({'$or': [
    {name: { '$regex': new RegExp(q, 'i') }},
    {description: { '$regex': new RegExp(q, 'i') }},
  ]}, (err, items) => {
    res.render('content.ejs', {
      cate: `${q} 的搜索结果`,
      description: '',
      cates: cates,
      items: items,
      langs: [
        {
          name: '中文(简体)',
          code: 'zh_CN',
        },
      ]
    })
  })
})

app.get('/', (req, res) => {
    let lang = req.cookies.lang ? req.cookies.lang : null
    if (lang) {
        render(req, res, lang)
    } else {
        // 根据ip判断
        render(req, res, 'zh_CN')
    }
})

app.get('/:lang/:cate', (req, res) => {
    let lang = req.params.lang
    let cate = req.params.cate
    res.cookie('lang', lang, {maxAge: 604800000})
    render(req, res, lang, cate)
})

app.get('/:cate', (req, res) => {
    let cate = req.params.cate
    let lang = req.cookies.lang ? req.cookies.lang : null
    if (lang) {
        render(req, res, lang, cate)
    } else {
        // 根据ip判断
        render(req, res, 'zh_CN', cate)
    }
})

app.get('/get', (req, res) => {
    let lang = req.query.lang ? req.query.lang : null
    let cate = req.query.cate ? req.query.cate : null
    if (!lang || !cate) {
        res.status(400).end()
    }
})
