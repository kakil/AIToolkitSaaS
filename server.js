//connect config.env
require('dotenv').config({ path: './config.env'});
const applicationInsights = require("applicationinsights");
applicationInsights.setup(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING.start());
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
      await mongoose.connect(process.env.APPSETTING_MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('Connected to MongoDB!!!');
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
    }
  })();
    

const port = process.env.WEBSITES_PORT || 8080;
app.use(express.json());

//connect the routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/openai', require('./routes/openai'));
app.use('/api/stripe', require('./routes/stripe'));
app.use(errorHandler);

app.listen(port, () => { console.log(`Server is running on port ${port}`)});

// set to production
const node_env = process.env.APPSETTING_NODE_ENV;


// renders the front end as a static application,
// necessary for deployment and production
if(node_env === 'production') {
  app.use(express.static('./client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}