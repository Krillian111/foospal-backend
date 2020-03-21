const config = require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const connectToDatabase = require('./database/database');
const singlesRoutes = require('./api/matches/singles.routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

connectToDatabase();

const router = express.Router();
app.use('/api', router);
singlesRoutes(router);

app.listen(config.PORT, () => {
  console.log(`Listening on port: ${config.PORT}`)
});