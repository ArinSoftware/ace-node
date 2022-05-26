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
