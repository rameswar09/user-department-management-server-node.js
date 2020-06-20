const mongoose = require('mongoose')

//const url='mongodb+srv://rameswar09:<password>@cluster0-ahwgi.mongodb.net/user-dept-app' // will move env variiii
const urlDev= 'mongodb://127.0.0.1:27017/task-manager-api'
mongoose.connect(urlDev, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
