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
    console .log(JSON.stringify(req.body));
    login({
        email: "cee.bot.7",
        password: cred.key
    }, function callback(err, api) {
        if (err) return console.error(err);
        // var yourID = 100000080590639 ;
        var yourID = 1323709537696090
        var bodyMsg = JSON.stringify(req.body);
        if(req.body.hook_id){
            bodyMsg += "\nhook_id: " + req.body.hook_id;
        }
        // var bodyMsg = "Response of git: " + "hookid: " +
        //     req.body.hook_id + "Reponame: " + req.body.repository.name;
        var msg = {
            body: bodyMsg
        };
        api.sendMessage(msg, yourID);
        // res.send("on push: " + JSON.stringify(req.body));
        res.sendStatus(200);
    });
});

app.get('/ghpush', function (req, res) {
    res.send("body: " + JSON.stringify(req.body));

});


app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});

// wh server below
// var http = require('http')
// var createHandler = require('github-webhook-handler')
// var handler = createHandler({
//     path: '/https://cee-github-listener.herokuapp.com/ghpush', secret: ''
// })

// http.createServer(function (req, res) {
//     handler(req, res, function (err) {
//         res.statusCode = 404
//         res.end('no such location')
//     })
// }).listen(process.env.PORT || 80)

// handler.on('error', function (err) {
//     console.error('Error:', err.message)
// })

// handler.on('push', function (event) {
//     console.log('Received a push event for %s to %s',
//         event.payload.repository.name,
//         event.payload.ref)
//     login({
//         email: "cee.bot.7",
//         password: cred.key
//     }, function callback(err, api) {
//         if (err) return console.error(err);
//         // var yourID = 100000080590639;
//         var yourID = 1323709537696090
//         var bodyMsg = "Response of git: " + event.payload.repository.name;
//         var msg = {
//             body: bodyMsg
//         };
//         api.sendMessage(msg, yourID);
//         // res.send("on push: " + JSON.stringify(req.body));
//         res.sendStatus(200);
//     });
// })

// handler.on('issues', function (event) {
//     console.log('Received an issue event for %s action=%s: #%d %s',
//         event.payload.repository.name,
//         event.payload.action,
//         event.payload.issue.number,
//         event.payload.issue.title)
// })