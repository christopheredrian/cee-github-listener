const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var fs = require('fs');
var login = require("facebook-chat-api");
//  Middlewares
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
var cred = JSON.parse(fs.readFileSync('./scrt.json', "utf-8"));
app.set('port', (process.env.PORT || 80));

// POST method route
app.post('/ghpush', function (req, res) {
    login({
        email: "cee.bot.7",
        password: cred.key
    }, function callback(err, api) {
        if (err) return console.error(err);
        var bodyMsg = "Hey! There was a push on our repo!";
        var yourID = 912570548846730;
        bodyMsg = bodyMsg + "\nRepo name: " + req.body.repository.name;
        bodyMsg = bodyMsg + "\nSender: " + req.body.sender.login;
        bodyMsg = bodyMsg + "\nCheck it out here: : " + req.body.repository.html_url;
        var msg = {
            body: bodyMsg
        };
        api.sendMessage(msg, yourID);
        res.sendStatus(200);
    });
});
// GET method route
app.get('/ghpush', function (req, res) {
    res.send("body: " + JSON.stringify(req.body));

});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});