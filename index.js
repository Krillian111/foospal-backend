const config = require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const connectToDatabase = require('./database/database');
const singlesRoutes = require('./api/matches/singles.routes');
const loginRoutes = require('./auth/auth.routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());

connectToDatabase();

const apiRouter = express.Router();
app.use('/api', apiRouter);
singlesRoutes(apiRouter);

const authRouter = express.Router();
app.use('/auth', authRouter);
loginRoutes(authRouter);

app.listen(config.PORT, () => {
  console.log(`Listening on port: ${config.PORT}`)
});
