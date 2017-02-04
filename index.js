var login = require("facebook-chat-api");
var fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.set('port', (process.env.PORT || 80));
var cred = JSON.parse(fs.readFileSync('./scrt.json', "utf-8"));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

// POST method route
app.post('/ghpush', function (req, res) {
    //   res.send('POST request to the homepage')
    console.log(JSON.stringify(req.body));
    login({
        email: "cee.bot.7",
        password: cred.key
    }, function callback(err, api) {
        if (err) return console.error(err);
        // var yourID = 100000080590639;
        var yourID = 1323709537696090
        var msg = {
            body: req.body
        };
        api.sendMessage(msg, yourID);
        res.send("on push: " + JSON.stringify(req.body));

    });
});

app.get('/ghpush', function (req, res) {
    res.send("body: " + JSON.stringify(req.body));

});


app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});