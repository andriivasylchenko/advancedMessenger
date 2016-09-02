var express = require('express'),
    bodyParser = require('body-parser'),
    compression = require('compression'),
    cors = require('cors'),
    path = require('path'),
    request = require('request');
    passport = require('passport-mfp-token-validation').Passport,
    mfpStrategy = require('passport-mfp-token-validation').Strategy,
    app = express();

passport.use(new mfpStrategy({
    authServerUrl: 'http://localhost:9080/mfp/api',
    confClientID: 'mockServer',
    confClientPass: '123456',
    analytics: {
        onpremise: {
            url: 'http://localhost:9080/analytics-service/rest/v3',
            username: 'admin',
            password: 'admin'
        }
    }
}));


app.use(cors());
app.use(bodyParser.json());
app.use(compression());
app.use(passport.initialize());

app.get('/api', function (req, res) {
    res.send('Mock APIs are running');
});

app.get('/auth', function (req, res) {
    res.send('test Auth');
});


app.get('/schedule', passport.authenticate('mobilefirst-strategy', {
        session: false,
        scope: 'restrictedData'
    }), function (req, res) {
    console.log('Schedule service was called');

    var obj = require("./data/schedule.json");

    res.json(obj);
});

app.get('/distance', passport.authenticate('mobilefirst-strategy', {
        session: false,
        scope: 'restrictedData'
    }), function (req, res) {
    console.log('Distance service was called');

    var googleURL = 'https://maps.googleapis.com:443/maps/api/distancematrix/json';
    var origins = req.query['origins'];
    var destinations = req.query['destinations'];
    var departure_time = req.query['departure_time'];
    var traffic_model = req.query['traffic_model'];

    var path = googleURL + '?origins=' + origins + '&destinations=' + destinations + '&departure_time=' + departure_time + '&traffic_model=' + traffic_model;

    console.log('--> requested path ' + path);

    var options = {
        uri: encodeURI(path),
        method: 'GET'
    };

    request(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.json(JSON.parse(body))
        } else {
            res.json({"status": response.statusCode, "error": error, "fullResponse": response})
        }
    })


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