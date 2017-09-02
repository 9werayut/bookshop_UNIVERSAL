var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// APIs
var mongoose = require('mongoose');
//local db
//mongoose.connect('mongodb://localhost:27017/bookshop');

//mongo lab
mongoose.connect('mongodb://testUser:123456@ds121534.mlab.com:21534/bookshop');

var db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error: '));
// ==== SETUP Session ======
app.use(session({
  secret: 'mySecretString',
  saveUninitialized: false,
  resave: true,
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 2},   // 2 day in millisec
  store: new MongoStore({mongooseConnection: db, ttl: 2 * 24 * 60 * 60})
  // ttl 2 day 24 hours 60 minit 60 sec
}))
  // ==== SAVE SESSION CART API  =========
  app.post('/cart', function(req, res){
    var cart = req.body;
    req.session.cart = cart;
    req.session.save(function(err) {
      if(err){
        throw err;
      }
      res.json(req.session.cart);
    })
  });
  // GET SESSION CART API
  app.get('/cart', function(req, res){
    if(typeof req.session.cart !== 'undefined'){
      res.json(req.session.cart);
    }
  });

// ==== END SETUP Session ======

var Books = require('./models/books.js');

// ========= POST BOOKS ===========
app.post('/books', (req, res) => {
  var book = req.body;

  Books.create(book, (err, books) => {
    if(err) console.log('# API CREATE BOOK: ', err);
    res.json(books);
  });
});

// ========== GET BOOKS ============
app.get('/books', (req, res) => {
  Books.find((err, books) => {
    if(err) console.log('# API GET BOOK: ', err);

    res.json(books);
  })
});

// ========== DELETE BOOKS =========
app.delete('/books/:_id', (req, res) => {

  let criteria = {_id: req.params._id}

  Books.remove(criteria, (err, books) => {
    if(err) console.log('# API DELETE BOOK: ', err);

    res.json(books);
  })
});

// ========= UPDATE BOOKS ==========
app.put('/books/:_id', (req, res) => {
  let book = req.body;
  let criteria = req.params._id;
  
  //if the field doesn't exist $set will set a new field
  var update = {
    '$set': {
      title: book.title,
      description: book.description,
      image: book.image,
      price: book.price
    }
  };

  // when true returns the update document
  let options = {new: true};

  Books.findOneAndUpdate(criteria, update, options, (err, books) => {
    if(err) console.log('# API UPDATE BOOK: ', err);

    res.json(books);
  })
});

// GET BOOKS IMAGES API
app.get('/images', function(req, res){
  const imgFolder = __dirname  + '/public/images/';
  //require file system
  const fs = require('fs');
  fs.readdir(imgFolder, function(err, files){
    if(err){
      return console.error(err);
    }
    //create any array
    const filesArr = [];
    let i = 1;
    files.forEach(function(file) {
      filesArr.push({name: file});
    });

    //send json 
    res.json(filesArr);
  })
})


// END APIs

app.listen(3001, err => {
  if(err) return console.log(err);

  console.log('API Server is listening on http://localhost:3001')

})