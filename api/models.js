const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017/mydb';

MongoClient.connect(uri, (err, db) => {
  if (err) throw err;
  db.close();
});
