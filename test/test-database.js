const { MongoClient } = require('mongodb');

let connection;
async function startDatabase() {
  connection = await MongoClient.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return await connection.db();
}

async function stopDatabase() {
  if (!connection) {
    throw new Error(
      'Database was stopped without being started. Start the database manually with at beginning of test.'
    );
  }
  await connection.close();
}

module.exports = {
  startDatabase,
  stopDatabase,
};
