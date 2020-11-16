var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var mongoose = require("mongoose");

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://tk9294:MH2o2uZvFTxOecFC@cluster0.kbaxw.mongodb.net/memoryGame?retryWrites=true&w=majority", function (err, database) {
    if (err) {
        console.log("Error: " + err);
    }
    else {
        console.log("We're connected to MongoDB, Database: " + database.name);
    }
});

// Creating a Model:
var GameHistory = mongoose.model("GameHistory", {
     date: String,
     moves: Number,
     totalTime: Number
});


// Adding a new Product: 
app.post("/game", function (request, response) {
    var history = new GameHistory(request.body);
    history.save(function (err, product) {
        if (err) {
            console.log("Error: " + err);
            response.status(500);
            response.send(err);
        }
        else {
            response.status(201); // 201 = Created
            response.send(history);
        }
    });
});


// Get all products: 
app.get("/game", function (request, response) {
    GameHistory.find({}, function (err, history) {
        if (err) {
            console.log("Error: " + err);
            response.status(500);
            response.send(err);
        }
        else {
            response.send(history); // Default Status = 200
        }
    });
});

 app.use(express.static(__dirname + '/dist'));


app.get('/',function(req,res){
res.sendFile(path.join(__dirname + '/dist/index.html'));
});


// app.listen(3000, function () {
//     console.log("Listening on http://localhost:3000");
// });
app.listen(process.env.PORT || 3000,function(){
    console.log("Listening on http://localhost:3000");
});