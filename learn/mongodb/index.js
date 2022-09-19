const { MongoClient } = require('mongodb');

let mClient = null;
async function getcollection(client, collection) {
  const result = await client
    .db('moviesdb')
    .collection(collection)
    .find({})
    .toArray();
  return result;
}

async function main() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    mClient = await client.connect();
    return mClient;
  } catch (e) {
    console.error(e);
    return null;
  }
}

async function test() {
  const client = await main();
  const result = await getcollection(client, 'generals');
  console.log('getcollection:', result);
}
