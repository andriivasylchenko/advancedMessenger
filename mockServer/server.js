var express = require('express'),
    bodyParser = require('body-parser'),
    compression = require('compression'),
    cors = require('cors'),
    path = require('path'),
    app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(compression());

app.get('/api', function (req, res) {
    res.send('Mock APIs are running');
});

app.get('/auth', function (req, res) {
    res.send('test Auth');
});


app.get('/schedule', function (req, res) {
    console.log('Schedule service was called');

    var obj = require("./data/schedule.json");

    res.json(obj);
});

app.get('/employees', function (req, res) {
    console.log('Employee service was called');

    var obj = require("./data/employees.json");

    res.json(obj);
});

app.get('/news', function (req, res) {
    console.log('News service was called');

    var obj = require("./data/news.json");

    res.json(obj);
});


app.listen(4567, function(){
    console.log('Express server listening on port 4567');
});