var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");


var axios = require("axios");
var cheerio = require("cheerio");


var db = require("./models");

var PORT = 3000;


var app = express();


app.use(logger("dev"))

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));


var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";


mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });


app.get("/scrape", function(req, res) {
 
  axios.get("http://www.nytimes.com/").then(function(response) {
    
    var $ = cheerio.load(response.data);

   
    $("article h2").each(function(i, element) {
   
      var result = {};

      
      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");

     
      db.Article.create(result)
        .then(function(dbArticle) {
          
          console.log(dbArticle);
        })
        .catch(function(err) {
          
          return res.json(err);
        });
    });

    
    res.send("Scrape Complete");
  });
});


app.get("/articles", function(req, res) {
 
  db.Article.find({})
    .then(function(dbArticle) {
     
      res.json(dbArticle);
    })
    .catch(function(err) {
     
      res.json(err);
    });
});


app.get("/articles/:id", function(req, res) {
  
  db.Article.findOne({ _id: req.params.id })
   
    .populate("note")
    .then(function(dbArticle) {
      
      res.json(dbArticle);
    })
    .catch(function(err) {
    
      res.json(err);
    });
});


app.post("/articles/:id", function(req, res) {

  db.Note.create(req.body)
    .then(function(dbNote) {
     
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then(function(dbArticle) {
      
      res.json(dbArticle);
    })
    .catch(function(err) {
     
      res.json(err);
    });
});


app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
