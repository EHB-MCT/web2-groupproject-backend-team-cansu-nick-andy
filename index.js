const express = require("express");
const app = express();
const router = express.Router();
const port = process.env.PORT || 3000

// Mongo
const MongoClient = require('mongodb').MongoClient;
// const URI = *vul URI in*
// const DB_NAME  =*vul DB_NAME in*
// const client = new MongoClient(URI, { useNewUrlParser: true });

// Middleware

let db, collection;

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(cors());

// Router
router.route('/challenges')
.get((req, res) => {
// hier komt nog
})
.post((req, res) => {
// hier komt nog
})

router.route('/challenges/:id')
.put((req, res) => {
  // hier komt nog
})
.delete((req, res) => {
  // hier komt nog
})

app.use('/api', router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  client.connection( err => {
    if(err){
      throw err;
    }
    db = client.db(DB_NAME);
    console.log(`Connected to database: ${DB_NAME}`);
  });
});