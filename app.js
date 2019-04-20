//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req ,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req ,res){

    var firstname = req.body.fname;
    var lastname = req.body.lname;
    var ymail = req.body.ymail;

    var data = {
      members: [
        {
          email_address: ymail,
          status: "subscribed",
          merge_fields: {
            FNAME: firstname,
            LNAME: lastname
          }
        }
      ]
    };

    var jsonData = JSON.stringify(data);

    var options = {
      url: "https://us20.api.mailchimp.com/3.0/lists/daff32a4d9",
      method: "POST",
      headers: {
        "Authorization": "Deeven1 dbd46ea3f7d6b480550e396cc1af2dac-us20"
      },
      body: jsonData
    };

   request(options,function(error,response,body){
     if(error){
        console.log(error);
        res.sendFile(__dirname + "/failure.html");
     }else{
       console.log(response.statusCode);
       res.sendFile(__dirname + "/success.html");
     }
   });
});


app.post("/failure.html", function(req, res){
  res.redirect("/");
});




app.listen(process.env.PORT || 3000, function(){
console.log("The server is running on port 3000");
});
