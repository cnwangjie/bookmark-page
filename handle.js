const ejs = require('ejs')
const fs = require('fs')
let data = fs.readFileSync('./bm.json')
let temp = fs.readFileSync('./template/content.ejs').toString()
data = JSON.parse(data)
for (let cate of data) {
    let t = ejs.render(temp, {
        cate: cate.name,
        description: '',
        cates: data,
        items: cate.list,
    })
    if (!fs.existsSync(`./public/${cate.name}/`)) {
        fs.mkdirSync(`./public/${cate.name}/`)
    }
    fs.writeFileSync(`./public/${cate.name}/index.html`, t)
}
