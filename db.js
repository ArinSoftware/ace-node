require('dotenv').config();
const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGO_URL, {
    dbName: 'ComplexApp',
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB Connected Successfully');
  });

const app = require('./app');
app.listen(process.env.PORT);

/* // Database Name
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
 */
