require('dotenv').config()
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 60000
    }, resave: false,
    saveUninitialized: false 
}));

app.use("/dist", express.static(__dirname + "/dist"));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
mongoose.set('debug', true);

require('./models/Users');
require('./config/passport');
app.use(require('./routes'));

app.use((req, res, err) => {
  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});


var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('Server running on ' + process.env.APP_URL + ':' + port + '/');
});