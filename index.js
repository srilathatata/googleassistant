'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const http = require('https');
var unirest = require("unirest");
let errorResposne = {
    results: []
};
var port = process.env.PORT || 8080;
const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());


restService.post('/getMovies',function (request,response)  {
    
        var req = unirest("GET", "https://googleassistantapi.uk-e1.cloudhub.io/test");
            req.end(function(res) {

                    let result = res.body;
                    
                    response.setHeader('Content-Type', 'application/json');
                    response.send(JSON.stringify({
                        "speech" : result,
                        "displayText" : result
                    })); 
            });
   
});

restService.listen(port, function() {
  console.log("Server up and listening");
});
