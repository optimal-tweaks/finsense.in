const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const path = require('path');
const expressEdge = require('express-edge');
const express = require('express');
const bodyParser = require('body-parser');
const firebase = require('firebase');

const app = new express();

var firebaseConfig = {
    apiKey: "AIzaSyAOdDXlPTgXvXqIWEOAky9AcJHoQW3m7d8",
    authDomain: "finsense-wealth-minimal.firebaseapp.com",
    databaseURL: "https://finsense-wealth-minimal-default-rtdb.firebaseio.com",
    projectId: "finsense-wealth-minimal",
    storageBucket: "finsense-wealth-minimal.appspot.com",
    messagingSenderId: "85091451786",
    appId: "1:85091451786:web:29a32618ed67f9de603e73"
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

app.use(express.static(__dirname));
app.use(expressEdge.engine);
app.set('views', path.join(__dirname, "blogs", "views"));

// app.listen(4000);

app.get('/post/:id', async (req, res) => {
    await firebase.database().ref('blogs/' + req.params.id).once('value').then(function (snapshot) {
        const post = snapshot.val();
        var paraText = post.text;
        paraText = paraText.replace(/^\<p\>/, "").replace(/\<\/p\>$/, "");
        post.text = paraText;
        res.render('layouts/post', {
            post
        })
    })
});

app.get('/case_study/:id', async (req, res) => {
    await firebase.database().ref('case_study/' + req.params.id).once('value').then(function (snapshot) {
        const post = snapshot.val();
        var paraText = post.text;
        paraText = paraText.replace(/^\<p\>/, "").replace(/\<\/p\>$/, "");
        post.text = paraText;
        res.render('layouts/post', {
            post
        })
    })
});

exports.app = functions.https.onRequest(app);
