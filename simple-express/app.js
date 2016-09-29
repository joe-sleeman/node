var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var app = express();

// tell jade which folder the template files will be in
app.set('views', path.join(__dirname, 'views'));
// set view engine.
app.set('view engine', 'jade');

// middleware??
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// routes.

// index.
app.get('/', function(req, res){
	// render index view. Example of passing data to index.
	res.render('index', {title: 'Welcome'});
});

// about.
app.get('/about', function(req, res){
	res.render('about');
});

// contact
app.get('/contact', function(req, res){
	res.render('contact');
});

// contact/send post.
// Fill with real info if actually using it.
app.post('/contact/send', function(req, res){
	var transporter = nodemailer.createTransport({
		service: "Gmail",
		auth: {
			user: 'techguyinfo@gmail.com',
			pass: '***********'
		}
	});

	var mailOptions = {
		from: 'Joe <techguyinfo@gmail.com>',
		to: 'support@whatever.com',
		subject: 'Website Submission',
		text: 'You have a submission with the following details... Name: ' + req.body.name + 'Email: ' + req.body.email + 'Message: ' + req.body.message,
		html: '<p>You have a submission with the following details...</p><ul><li>Name: ' + req.body.name + '</li><li>Email: ' + req.body.email + '</li><li>Message: '+ req.body.message + '</li></ul>'
	};

	transporter.sendMail(mailOptions, function(error, info){
		if (error) {
			console.log(error);
			res.redirect('/');
		}
		else {
			console.log('Message Sent: ' + info.response);
			res.redirect('/');
		}
	});
});

app.listen(3000);
console.log('Server is running on port 3000');