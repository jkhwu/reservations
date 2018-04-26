// *** SETUP ***
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var firebase = require('firebase');
var config = {
    apiKey: "AIzaSyDm0IJ40JXrqInMqQUu5CQmSNPYJdDmjaQ",
    authDomain: "reservations-815a7.firebaseapp.com",
    databaseURL: "https://reservations-815a7.firebaseio.com",
    projectId: "reservations-815a7",
    storageBucket: "",
    messagingSenderId: "946224867672"
};
firebase.initializeApp(config);
var resRef = firebase.database().ref("/reservations");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())

// *** ROUTING ***

// GET "/" renders "view.html"
app.get('/', (req, res, next) => {
    var fileName = __dirname + '/home.html';
    res.sendFile(fileName, function(err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:', fileName);
        }
    });
});

// GET "/tables" renders "tables.html"
app.get('/tables', (req, res, next) => {
    var fileName = __dirname + '/tables.html';
    res.sendFile(fileName, function(err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:', fileName);
        }
    });
});

// GET "/reserve" renders "reserve.html"
app.get('/reserve', (req, res, next) => {
    var fileName = __dirname + '/reserve.html';
    res.sendFile(fileName, function(err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:', fileName);
        }
    });
});



// GET "/api/tables"
// Displays all tables
app.get('/api/tables', (req, res) => {
    resRef.once('value').then(function(snapshot) {
        // handle read data.
        res.send(snapshot.val());
    });
    // res.send('Display all Tables');
    // console.log('Getting all characters');
    // var fileName = __dirname + '/seeds.json';
    // res.sendFile(fileName, function(err) {
    //     if (err) {
    //         next(err);
    //     } else {
    //         console.log('Sent:', fileName);
    //     }
    // });
});

// // Ryan's code
// app.get('/api/tables', function(req, res) {
//     res.setHeader('Content-Type', 'application/json');

//     firebase.database().ref('/Customers').once('value').then(function(data) {
//         let newData = data.val()
//         res.send(newData);
//     })
// })

// GET "/api/waitlist"
// Displays waitlist
app.get('/api/waitlist', (req, res) => {
    res.send('Display Waitlist');
});

// POST "/api/tables"
// creates new reservations with JSON input
app.use('/api/tables', (req, res) => {
    if (!req.body) return res.sendStatus(400)
    console.log(req.body);
    // let child = encodeURIComponent(req.body.customerName.replace(/\s/g, '').toLowerCase());
    let child = req.body.customerName.replace(/\s/g, '').toLowerCase();
    let newRef = resRef.child(child);
    newRef.set({
        customerName: req.body.customerName,
        phoneNumber: req.body.phoneNumber,
        customerEmail: req.body.customerEmail,
        customerID: req.body.customerID
    });
});

app.listen(3000, () => console.log('App listening on http://localhost:' + 3000));