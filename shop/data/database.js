const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let database;

async function connectToDatabase() {
  const client = await MongoClient.connect('mongodb://127.0.0.1:27017');
  database = client.db('online-shop');
}

function getDb() {
  if (!database) {
    throw new Error('우선적으로 연결');
  }

  return database;
}

module.exports = {
  connectToDatabase: connectToDatabase,
  getDb: getDb
}