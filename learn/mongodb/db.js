const { MongoClient } = require('mongodb');

let db;
let client;

module.exports = {
  db: () => db,
  client: () => client,
  connect: async () => {
    client = new MongoClient(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    db = client.db('moviesdb');
  },
  close: async () => client.close(),
};
