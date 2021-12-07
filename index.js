const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
//const config = require('./config.json');
require('dotenv').config()
const app = express();
const challengeRouter = express.Router();
const port = process.env.PORT || 3000;
const {ObjectID} = require("mongodb");

// Challenge class

class Challenge{
  constructor(){
    this.name = "";
    this.points = 0;
    this.course = "";
  }
}


// Mongo
const MongoClient = require("mongodb").MongoClient;
const uri =
  process.env.FINAL_URL;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const DB_NAME = "team-cansu";

// Middleware

let db, collection;

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());

// Router
challengeRouter
  .route('/challenges')
  .get((req, res) => {
    collection = db.collection("challenges");
    collection.find({}).toArray((error, result) => {
      if(error) {
        return res.status(500).send(error);
      }
      res.json(result);
    });
  })
  .post((req, res) => {
    let challenge = new Challenge;
    challenge.name = req.body.name;
    challenge.points = req.body.points;
    challenge.course = req.body.course;

    collection = db.collection("challenges");
    collection.insertOne(challenge).then(result => {
      console.log(result);
    });
    res.send(`Succesfully added challenge ${challenge.name} to the database`);
  });

challengeRouter
  .route('/challenges/:id')
  .get((req,res) => {
    async function run(){
      try{
        collection = db.collection("challenges");
        let id = new ObjectID(req.params.id);
        const result = await collection.findOne({_id : id});
        res.json(result);
      }
      catch(err){
        return err;
      }
    }
    run();
  })
  .put((req, res) => {
    async function run() {
      try{
        collection = db.collection("challenges");
        let id = new ObjectID(req.params.id);
        let field = req.body.field;
        let value = req.body.value;
        let result;
        switch(field){
          case "name":{
            result = await collection.updateOne({_id : id},
              {$set : {"name" : value}});
            break;
          }
          case "points": {
            result = await collection.updateOne({_id : id},
              {$set : {"points" : value}});
            break;
          }
          case "course": {
            result = await collection.updateOne({_id : id},
              {$set : {"course" : value}});
            break;
          }
        }
        res.json(result);
      }
      catch(err){
        return err;
      }
    }
    run();
  })
  .delete((req, res) => {
    async function run(){
      try{
        collection = db.collection("challenges");
        let id = new ObjectID(req.params.id);
        const result = await collection.deleteOne({_id : id});
        res.json(result);
      }
      catch(err){
        return err;
      }
    }
    run();
  });

app.use("/api", challengeRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  client.connect(err => {
    if (err) {
      throw err;
    }
    db = client.db(DB_NAME);
    console.log(`Connected to database: ${DB_NAME}`);
  });
});
