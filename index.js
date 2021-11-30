const express = require("express");
const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;

// Mongo
const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://team-cansu:<password>@cluster0.wror6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
const DB_NAME = "team-cansu";

// Middleware

let db, collection;

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());

// Router
router
  .route("/challenges")
  .get((req, res) => {
    // hier komt nog
  })
  .post((req, res) => {
    // hier komt nog
  });

router
  .route("/challenges/:id")
  .put((req, res) => {
    // hier komt nog
  })
  .delete((req, res) => {
    // hier komt nog
  });

app.use("/api", router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  client.connection((err) => {
    if (err) {
      throw err;
    }
    db = client.db(DB_NAME);
    console.log(`Connected to database: ${DB_NAME}`);
  });
});
