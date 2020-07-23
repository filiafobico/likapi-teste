const MongoClient = require('mongodb').MongoClient;
const uri = process.env.DB_HOST;
const client = new MongoClient(uri, { useUnifiedTopology: true });

client.connect( err => {
  if (err) {
    console.error(err);
    return;
  }
  global.db = client.db("linkapi");
  console.info('Connected on database');
});
