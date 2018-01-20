var mongoose = require('mongoose');
var userSchema = mongoose.Schema;

var board = new userSchema({
  title: String,
  author: String,
  content: String,
  date: {type: Date, default: Date.now},
})

//외부로 내보내기
module.exports = mongoose.model('board', board);
