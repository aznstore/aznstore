var express = require('express');
var app = express();

app.get('/', function(req, res){
	var message = 'Hello World Mitchell sucks';
	res.send(message);
});

app.listen(3000, function(){
	console.log('Ears on port 3000');
});

