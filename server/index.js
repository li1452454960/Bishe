const express = require('express')
const bodyParser = require('body-parser')
const morgan = require ('morgan')
const app = express()

//全局秘钥
app.set('secret', 'id41a6sd4f4a624')

app.use(require('cors')())
app.use(express.json())
//托管静态文件
app.use('/uploads',express.static(__dirname + '/uploads'))


 require('./plugins/db')(app)
 require('./routes/web')(app)
app.use(bodyParser.json())
app.use(morgan('combined'))

app.listen(3000, () => {
    console.log('http://localhost:3000');
});