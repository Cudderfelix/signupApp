//jshint esversion: 6

const express = require("express");

const bodyParser = require("body-parser");

const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.use(express.static("public"));

app.post("/", function(req, res) {

    let firstName = req.body.fname;
    let lastName = req.body.lname;
    let emailAdd = req.body.email;

    let data = {
        members: [{
            email_address: emailAdd,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }

        }]
    };

    let jsonData = JSON.stringify(data);



    let options = {
        url: "https://us19.api.mailchimp.com/3.0/lists/cb59fe2221",
        method: "POST",
        headers: {
            "Authorization": "code1 be9d1276610432370bb2ce97c19a2803-us19"
        },

        body: jsonData

    };

    request(options, function(error, response, body) {
        if (error) {
            res.sendFile(__dirname + "/failure.html");
        } else {
            if (response.statusCode === 200) {
                res.sendFile(__dirname + "/success.html");
            } else {
                res.sendFile(__dirname + "/failure.html");
            }

        }


    });

});

app.post("/failure", function(req, res) {
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
    console.log("Server started on port 3000");
});

//api key
//be9d1276610432370bb2ce97c19a2803 - us19

//audience id
//cb59fe2221