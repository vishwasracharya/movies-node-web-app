/* eslint-disable no-unused-vars */
const { db, connect, client, close } = require('./db');

/* Read Operations */
async function find() {
  await connect();
  const generals = db().collection('generals');
  const general = await generals.find().toArray();
  console.log(general);
  await close();
}
async function findbyname(name) {
  await connect();
  const generals = db().collection('generals');
  const general = await generals.find({ name }).toArray();
  console.log(general);
  await close();
}

/* Create Operations */
async function insertOne() {
  await connect();
  const generals = db().collection('generals');
  const general = await generals.insertOne({
    name: 'The Godfather',
  });
  console.log(general);
  await close();
}
async function insertMany() {
  await connect();
  const generals = db().collection('generals');
  const general = await generals.insertMany([
    {
      name: 'The Godfather: Part II',
    },
    {
      name: 'The Godfather: Part III',
    },
  ]);
  console.log(general);
  await close();
}

/* Update Operations */
async function updateOne() {
  await connect();
  const generals = db().collection('generals');
  const general = await generals.updateOne(
    { name: 'The Godfather' },
    { $set: { name: 'The Godfather: Part I' } }
  );
  console.log(general);
  await close();
}
async function updateMany() {
  await connect();
  const generals = db().collection('generals');
  const general = await generals.updateMany(
    { name: 'The Godfather: Part II' },
    { $set: { name: 'The Godfather: Part II' } }
  );
  console.log(general);
  await close();
}

/* Delete Operations */
async function deleteOne() {
  await connect();
  const generals = db().collection('generals');
  const general = await generals.deleteOne({ name: 'The Godfather: Part I' });
  console.log(general);
  await close();
}
async function deleteMany() {
  await connect();
  const generals = db().collection('generals');
  const general = await generals.deleteMany({ name: 'The Godfather: Part I' });
  console.log(general);
  await close();
}

/* Aggregation */
async function aggregate() {
  await connect();
  const generals = db().collection('generals');
  const general = await generals.aggregate([
    {
      $group: {
        _id: '$name',
      },
    },
  ]);
  console.log(await general.toArray());
  await close();
}
async function count() {
  await connect();
  const generals = db().collection('generals').count();
  console.log(await generals);
  await close();
}
async function sort() {
  await connect();
  const generals = db().collection('generals').find().sort({ name: 1 });
  console.log(await generals.toArray());
  await close();
}
async function limit() {
  await connect();
  const generals = db().collection('generals').find().limit(1);
  console.log(await generals.toArray());
  await close();
}
async function skip() {
  await connect();
  const generals = db().collection('generals').find().skip(1);
  console.log(await generals.toArray());
  await close();
}

/* Sharding */
async function shard() {
  await connect();
  const generals = db().collection('generals');
  await generals.createIndex({ name: 1 });
  await close();
}
