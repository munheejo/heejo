var express = require('express')
var app = express()
var ejs = require('ejs')

var mongoose = require('mongoose');
var Board = require('./models/board');
//mongoose랑 연결
mongoose.connect('mongodb://heejo:1234@ds257627.mlab.com:57627/heejo');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
console.log(" we're connected! ");//연결되면
});

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.set('views', __dirname + '/public');
app.set('view engine', 'ejs');//여기까진 기본

//리스트 불러오기
app.get('/', function (req, res){
     Board.find({}, function(err, results){
          if(err) throw err;
           res.render('list.ejs', {board: results})
     })
})

//
app.get('/write', function (req, res){
     res.render('write.ejs')
})

//글 적는 칸
app.post('/write', function(req,res){
  var board = new Board({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  })
  board.save(function (err){
    if (err) return console.errors(err);

  })
  res.redirect('/');
})

//
app.get('/show/:id', function (req, res){
     Board.find({_id: req.params.id}, function(err, results){
          if(err) throw err;
     res.render('show.ejs', {board: results})
     //results는 임의로 바꿔도됨. 위에랑 동일하기만 하면 ok
     })
})

//삭제
app.post('/delete/:id', function(req,res){
     Board.remove({_id: req.params.id}, function(err, results){
          if(err) throw err;
               console.log("했냐");

     })
     res.redirect('/')
})

//수정
app.post('/update/:id', function(req,res){
     Board.where({_id: req.params.id}).update(
          {
            title: req.body.title,
            content: req.body.content
       },
       function(err, results){
          if(err) throw err;
               console.log("zzz")
     })
     res.redirect('/')
})

app.post('/update2/:id', function (req, res){
     Board.find({_id: req.params.id}, function(err, results){
          if(err) throw err;
     res.render('update.ejs', {board: results})
     //results는 임의로 바꿔도됨. 위에랑 동일하기만 하면 ok
     })
})

app.post('/reply', function (req, res){

})
app.listen(3000)
