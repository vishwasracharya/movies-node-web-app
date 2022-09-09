const mongoose = require('mongoose');
let DB;
if (process.env.ENVIRONMENT === 'testing') {
  DB = process.env.TEST_MONGODB_URI;
}
if (process.env.ENVIRONMENT === 'dev' || process.env.ENVIRONMENT === 'prod') {
  DB = process.env.MONGODB_URI;
}

mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>  {
      if (process.env.ENVIRONMENT !== 'testing') {
        console.log(`MongoDB Connected: ${process.env.ENVIRONMENT}`)
      }
    })
    .catch(err => console.log(err));