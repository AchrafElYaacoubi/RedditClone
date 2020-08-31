const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const config = require('./config');
const passport = require('passport');
const { localStrategy, localAuth } = require('./auth/local');
const { jwtStrategy, jwtAuth } = require('./auth/jwt');



const app = express();

app.use(express.json());
app.use(morgan('common'));

app.use(passport.initialize());  // initialize passport

passport.use(localStrategy);
passport.use(jwtStrategy);

// Implementing the strategie on a specific route
app.use("/login", localAuth, require('./routes/auth'))


connect()
  .on('error', console.log)
  .once('open', listen)

app.use('/posts', jwtAuth, require('./routes/posts'));
app.use('/users', require('./routes/users'));

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
    useUnifiedTopology: true,
    useCreateIndex: true,
  };
  mongoose.connect(config.db, options);
  return mongoose.connection;
}
