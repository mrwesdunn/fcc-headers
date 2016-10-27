var express = require('express');
var app = express();
var bodyParser = require('body-parser');

port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var router = express.Router();

router.get('/whoami', function(req, res) {
	res.json({
		ipaddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress, 
		language: req.headers['accept-language'].slice(0,5), 
		software: req.headers['user-agent'].match(/\(([^)]+)\)/)[1]
	});
});

app.use('/api', router);

app.listen(port);
console.log('Listening on ' + port);