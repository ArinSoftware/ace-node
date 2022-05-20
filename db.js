require('dotenv').config();
const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGO_URL);

// Database Name
const dbName = 'ComplexApp';

function main() {
  // Use connect method to connect to the server
  client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);

  module.exports = db;

  const app = require('./app');
  app.listen(process.env.PORT);
}

main();
