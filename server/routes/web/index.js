module.exports = app => {
    const express = require('express')
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const AdminUser = require('../../models/AdminUser')
    const router = express.Router({
      mergeParams: true
    })
    
//添加接口
    router.post('/', async (req, res) => {
      const model =  await req.Model.create(req.body)
      res.send(model)

    })
//编辑接口
    router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  router.put('/:id/state/:state', async (req, res, next) => {
    state = 0
		if(req.params.state && req.params.state == "true") state = 1
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
		// 	if(err) return res.sendResult(null,400,err)
		// 	res.sendResult(manager,200,"设置状态成功")
		// (req,res,next)
  })
//获取列表接口
    router.get('/',  async (req,res) =>{
     
      const queryOptions = {}
      if (req.Model.modelName === 'toy' || 'AdminUser') {
        queryOptions.populate = 'parent'
      }
      const items =  await req.Model.find({}).setOptions(queryOptions)
      res.send(items)
      

    })
//删除接口
    router.delete('/:id', async (req, res) => {
      await req.Model.findByIdAndDelete(req.params.id, req.body)
      res.send({
        success:true
      })

    })

    router.get('/:id', async (req, res) => {
      const model = await req.Model.findById(req.params.id)
      res.send(model)
    })

 // 登录校验中间件
 const authMiddleware = require('../../middleware/auth')
 const resourceMiddleware = require('../../middleware/resource')
//通用CRUD接口
    app.use('/web/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)
//上传图片
    const multer = require('multer')
    const upload = multer({dest: __dirname + '/../../uploads'})
    app.post('/web/api/upload', authMiddleware(), upload.single('file'), async(req, res) => {
      const file = req.file
      file.url = `http://localhost:3000/uploads/${file.filename}`
      res.send(file)

    })

//登录接口
app.post('/web/api/login', async (req,res) => {
  
 const { username, password } = req.body
  //根据用户名找用户
   
  const user = await AdminUser.findOne({username}).select('+password')
  assert(user, 422, '用户不存在')
  
   
  //校验密码
  const isValid = require('bcryptjs').compareSync(password,user.password)
  assert(isValid, 422, '密码错误')
  //返回token
  const token = jwt.sign({ id: user._id}, app.get('secret'))
  res.send({token})
})

//错误处理函数
app.use(async (err, req, res, next) => {
  // console.log(err)
  res.status(err.statusCode || 500).send({
    message: err.message
  })
})

}