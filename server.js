const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const morgan = require('morgan');
// const cors = require(`cors`)
// const mongoose = require('mongoose');
// Always require and configure near the top
require('dotenv').config();
require('./config/database');

const app = express();
const port = process.env.PORT || 3001;
// const db = mongoose.connection;

app.use(morgan('dev'));
app.use(express.json());


// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

app.use(require('./config/checkToken'));



// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));

// Protect the API routes below from anonymous users
const ensureLoggedIn = require('./config/ensureLoggedIn');
app.use('/api/items', ensureLoggedIn, require('./routes/api/items'));
app.use('/api/orders', ensureLoggedIn, require('./routes/api/orders'));

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
app.get('/*', (req, res) => {
  res.send(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Express app running on port ${port}`)
  });