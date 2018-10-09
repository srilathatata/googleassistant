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

restService.post('/getSentiments', (req, res) => {
    
    const reqUrl = encodeURI("https://googleassistantapi.uk-e1.cloudhub.io/test?keyword=Capgemini");
    http.get(reqUrl, (responseFromAPI) => {
        let completeResponse = '';
		console.log("1--->");
        responseFromAPI.on('data', (chunk) => {
            completeResponse += chunk;
        });
        responseFromAPI.on('end', () => {
			console.log("2---->");
            const payloadjson = JSON.parse(completeResponse);
			console.log("3------>" + payloadjson.sentiment.status);
            return res.json({
                speech: payloadjson.sentiment.status,
                displayText: payloadjson.sentiment.status,
                source: 'sentiment-api'
            });
        });
    }, (error) => {
        return res.json({
            speech: 'Something went wrong!',
            displayText: 'Something went wrong!',
            source: 'sentiment-api'
        });
    });
});

restService.listen(port, function() {
  console.log("Server up and listening");
});
