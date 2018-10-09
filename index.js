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
    
	const parameters = req.body.queryResult.parameters;
	var companyName = parameters['company_name'];
	
	const reqUrl = encodeURI("https://googleassistantapi.uk-e1.cloudhub.io/test?keyword=${companyName}");
    http.get(reqUrl, (responseFromAPI) => {
        let completeResponse = '';
		
        responseFromAPI.on('data', (chunk) => {
            completeResponse += chunk;
        });
        responseFromAPI.on('end', () => {
		    const payloadjson = JSON.parse(completeResponse);
			
            return res.json({"payload":{"google":{"expectUserResponse":true,"richResponse":{  "items":[  {   "simpleResponse":{   "textToSpeech": "we have received feedback about "+ keyword + " as "+payloadjson.sentiment.status}}]}}}});
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
