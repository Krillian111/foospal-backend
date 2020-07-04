const connectToDatabase = require('./database/database');
const config = require('./config/config');
const app = require('./app');

connectToDatabase();

app.listen(config.PORT, () => {
  console.log(`Listening on port: ${config.PORT}`);
});
