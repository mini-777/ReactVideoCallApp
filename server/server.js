const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const app = express();

//use cors to allow cross origin resource sharing
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

let books = [];

app.get('/home', function(req, res) {
  console.log('Inside Home Login');
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  console.log('Books : ', JSON.stringify(books));
  res.end(JSON.stringify(books));
});

app.post('/create', function(req, res) {
  console.log(req.body);
});

//start your server on port 3001
app.listen(3001, () => {
  console.log('Server Listening on port 3001');
});
