const express = require('express');
const cors = require('cors');
const bodyparser = require("body-parser");
let app = express();
let port = 3001;
const mongo = require("../database/index.js");

app.use(cors());
app.use(bodyparser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.get("/search/:input", (req, res) => {
  // res.header("Access-Control-Allow-Origin");
  console.log(req.params.input);
  mongo.searchShoes(req.params.input, (err, reviews) => {
    if (err) {
      console.log("error inside findall: ", err);
    } else {
      console.log("server side get complete");
      res.send(reviews);
    }
  });
});

app.get("/nameImg/:input", (req, res) => {
  // res.header("Access-Control-Allow-Origin");
  console.log(req.params.input);
  mongo.searchShoe(req.params.input, (err, reviews) => {
    if (err) {
      console.log("error inside findall: ", err);
    } else {
      console.log("server side get complete", reviews);
      res.send(reviews);
    }
  });
});

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
