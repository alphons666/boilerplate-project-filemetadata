'use strict';

var express = require('express');
var cors = require('cors');
const bodyparser = require('body-parser'),
	multer = require('multer'),
	upload = multer({dest: 'ups/'}),
  	fs = require('fs')

// require and use "multer"...

var app = express();

app.use(cors());
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
	res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/hello', function(req, res){
	res.json({greetings: "Hello, API"});
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
	if(!req.file)
		return res.status(400).json({message: 'No file'})

	let { originalname: name, mimetype: type, size, path } = req.file
	res.json({name, type, size})
	fs.unlink(path, (err) => {
		if (err) console.error(err);
		console.log(path + ' was deleted');
	});
})

app.listen(process.env.PORT || 3000, function () {
	console.log('Node.js listening ...');
});
