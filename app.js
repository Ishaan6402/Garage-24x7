var mong = require("mongoose");
var exp = require("express");
var bdyp = require("body-parser");
const { MongoKerberosError } = require("mongodb");
mong.connect('mongodb://localhost:27017/sample');
var db = mong.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function (callback) {
    console.log("Connection Succeeded");
});

var app = exp();
app.use(bdyp.json()); //send content to database by converting form data into key value pair type of content.
app.use(exp.static('public')); // it will fetch the files from the public folder.
app.use(bdyp.urlencoded({ // encode the url
    extended: true
}));

app.post('/sign_up', function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var pass = req.body.password;
    var phone = req.body.phone;

    var data = {
        "name": name,
        "email": email,
        "password": pass,
        "phone": phone
    }

    db.collection('details').insertOne(data, function (err, collection) {
        if (err) throw err;
        console.log("Record Inserted Successfully");
    });
    return res.redirect('signup_success.html');
})
app.get('/',function(req,res){
    res.set({
        'Access-Control-Allow-Origin':'*' //here star means that we can enter multiple vlaues in the form . if we want to enter only one value at a time the we will gonna use origin in place of star.
    });
    return res.redirect('/public/main.html');
}).listen(8080)

console.log("Server Listening At Port 8080");
