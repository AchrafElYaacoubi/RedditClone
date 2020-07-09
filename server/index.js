const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const config = require('./config');


const app = express();

app.use(express.json());
app.use(morgan('common'));

connect()
  .on('error', console.log)
  .once('open', listen)

app.use('/posts', require('./routes/posts'));

app.get('*', (req, res) => {
  res.end(req.originalUrl);
})

function listen() {
  app.listen(8080, () => {
    console.log(`listening on port ${config.port}`);
  });
}

function connect () {
  const options = { 
    useNewUrlParser: true,
    useUnifiedTopology: true
  };
  mongoose.connect(config.db, options);
  return mongoose.connection;
}
