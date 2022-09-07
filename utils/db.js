const mongoose = require('mongoose');
const DB = process.env.MONGODB_URI;

mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));