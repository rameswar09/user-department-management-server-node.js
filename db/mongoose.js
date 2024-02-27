const mongoose = require('mongoose')


const urlDev= process.env.MONGO_URL
mongoose.connect(urlDev)
  .then(() => console.log('Mongodb Connected!'));