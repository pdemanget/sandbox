/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');

var app = express();


//deprecated    app = module.exports = express.createServer();
var app = express();
var server = http.createServer(app);

//for test
// app.get('/', function(req, res) {
//     res.send("Hello World!");
// });

// MongoDB
var mongoose = require('mongoose'),
    db = mongoose.connect('mongodb://127.0.0.1/example'),
    //create the movie Model using the 'movies' collection as a data-source
    Movie = mongoose.model('movies', new mongoose.Schema({
        title: String,
        year: Number
    }));

// Configuration
app.configure(function () {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());//parse JSON into objects
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function () {
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
});

app.configure('production', function () {
    app.use(express.errorHandler());
});

// Routes
app.get('/', function (req, res) {
    res.redirect('/index.html');
});

app.get('/movies', function (req, res) {
    Movie.find({}, function (err, movies) {
        res.contentType('json');
        res.json({
            success: true,
            data: movies
        });
    });
});

app.post('/movies', function (req, res) {
    var newMovie = new Movie();
    var newMovieData = req.body;
    //remove the id which the client sends since it is a new Movie
    delete newMovieData['_id'];
    newMovie.set(newMovieData);
    newMovie.save(function (err, movie) {
        res.contentType('json');
        res.json({
            success: !err,
            data: movie
        });
    });
});

app.get('/movies/:id', function(req, res){
    Movie.find({_id: req.params.id}, function (err, movies) {
        res.contentType('json');
        res.json({
            success: true,
            data: movies
        });
    });
});

app.put('/movies/:id', function(req, res){
    Movie.find({_id: req.params.id}, function (err, movies) {
        //update db
        var movie = movies[0];
        movie.set(req.body);
        movie.save(function (err) {
            res.contentType('json');
            res.json({
                success: !err,
                data: req.body
            });
        });
    });
})

app.del('/movies/:id', function(req, res){
    Movie.remove({_id: req.params.id}, function (err, movies) {
        res.contentType('json');
        res.json({
            success: !err,
            data: []
        });
    });
});




server.listen(3000);
console.log("Express server listening on port %d in %s mode", server.address().port, app.settings.env);


//debugging
// var keys=[];
// for(key in app){
//     keys.push(key+" "+typeof app[key])

// }
// keys.sort();
// console.log("keys "+keys);
// console.log("json"+JSON.stringify(app));