

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')

const LoginModel = require('./models/login')
// import LoginModel from './models/login'
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())
// const corsOptions = {
//   origin: 'http://localhost:8081'
//   // methods: ['GET', 'POST'],
//   // allowedHeaders: ['Content-Type', 'Authorization']
// }
mongoose.connect('mongodb://localhost:27017/testadmin', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (!err) console.log('数据库连接成功')
})

app.get('/', (req, res) => {
  res.send('测试')
})

app.post('/loginUpdate', (req, res) => {
  const { username, password, id } = req.body
  console.log(username)
  LoginModel.updateOne({ _id: id }, { username }, (err, data) => {
    if (data) {
      res.send({
        message: '更新成功',
        success: true
      })
    }
  })
})

app.post('/loginDelete', (req, res) => {
  const { username, password, id } = req.body
  LoginModel.deleteOne({ _id: id }, (err, data) => {
    if (data) {
      res.send({
        message: '删除成功',
        success: true
      })
    }
  })
})

app.get('/userList', (req, res) => {
  // console.log(req)
  const { username, page,  pageSize } = req.query
  // console.log(page)
  // page = parseInt(page)
  // pageSize = parseInt(pageSize)
  // console.log(['username'])
  // let sort = req.param('sort')
  // let page = parseInt(req.param('page'))
  // let pageSize = parseInt(req.param('pageSize'))
  let skip = ( parseInt(page) - 1) * parseInt(pageSize)
  let params = {}
  // console.log(pageSize)

  let goodsModel = LoginModel.find(params).skip(skip).limit(parseInt(pageSize))
  goodsModel.sort({'username' : username})
  goodsModel.exec((err, doc)=> {
    if (err) {
      console.log(err)
    } else {
      res.json({
        msg: '好',
        success: true,
        data: {
          count: doc.length,
          listData: doc
        }
      })
    }
  })
})
app.post('/login', (req, res) => {
  const { username, password } = req.body
  LoginModel.findOne({ username }, (err, data) => {
    console.log(err, data)
    if (!data) {
      const aa = {
        username,
        password
      }
      LoginModel.create(aa)
      res.send({
        success: true,
        message: '登录成功'
      })
    } else {
      res.send({
        success: false,
        message: '当前账号已注册'
      })
    }
  })
})
app.listen(3000, () => {
  console.log('程序启动' + 3000)
})
