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
    var keyword = "Capgemini";
	const parameters = req.body.queryResult.parameters;
	console.log("1------>" + parameters);

	const reqUrl = encodeURI("https://googleassistantapi.uk-e1.cloudhub.io/test?keyword=${keyword}");
    http.get(reqUrl, (responseFromAPI) => {
        let completeResponse = '';
		
        responseFromAPI.on('data', (chunk) => {
            completeResponse += chunk;
        });
        responseFromAPI.on('end', () => {
		    const payloadjson = JSON.parse(completeResponse);
			console.log("3------>" + payloadjson.sentiment.status);
            return res.json({"payload":{"google":{"expectUserResponse":true,"richResponse":{  "items":[  {   "simpleResponse":{   "textToSpeech": "we have received feedback of "+ keyword + "as "+payloadjson.sentiment.status}}]}}}});
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
