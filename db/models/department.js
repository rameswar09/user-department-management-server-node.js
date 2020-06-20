const mongoose = require('mongoose')
const Department = mongoose.model('Department', {
  id: String,
  status: Boolean,
  name: String,
  code: String,
  time: { type: Date, default: Date.now },
})

module.exports = Department
