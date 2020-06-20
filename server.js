const express = require('express')
const userRouter = require('./router/user')
const departmentRouter = require('./router/department')
const fromRequestRouter = require('./router/form.request')
const commonRouters = require('./router/common')
const bodyParser = require('body-parser');
require('./db/mongoose')
var cors = require('cors')
const app = express()
const port = process.env.PORT || 3030

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use('/user',userRouter);
app.use('/dept',departmentRouter);
app.use('/form_req',fromRequestRouter);
app.use('/api',commonRouters)
app.listen(port,()=>{
  console.log(`port started on ${port}!!`)
})
