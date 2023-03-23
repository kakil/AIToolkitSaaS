//connect config.env
require('dotenv').config({ path: './config.env'});
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const errorHandler = require('./middleware/error');
const cookieParser = require('cookie-parser');

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded( {extended: true }));


var rawBodySaver = function (req, res, buf, encoding) {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8');
  }
}

app.use(bodyParser.json( { verify: rawBodySaver, extended: true }));

//connect to database
mongoose.set('strictQuery', true);
(async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('Connected to MongoDB!!!');
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
    }
  })();
    

const port = process.env.PORT || 4242;
app.use(express.json());

//connect the routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/openai', require('./routes/openai'));
app.use('/api/stripe', require('./routes/stripe'));
app.use(errorHandler);

app.listen(port, () => { console.log(`Server is running on port ${port}`)});
