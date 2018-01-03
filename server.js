const path = require('path');
const express = require('express');

const PORT = 8000;

const isProduction = process.env.NODE_ENV === 'production';

const app = express();

// http request logger
if (isProduction) {
  app.use(require('morgan')('combined'));
} else {
  app.use(require('morgan')('dev'));
}

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    'errors': {
      message: err.message,
      error: {}
    }
  });
});

// static resources and homepage
app.use(express.static(path.resolve(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// start the server
const server = app.listen(PORT, () => {
  console.log('Listening on port ' + server.address().port);
});
