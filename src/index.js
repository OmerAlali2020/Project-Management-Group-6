
var express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

// http://localhost:3000/
app.get('/', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/login.html'));
});
// http://localhost:3000/auth
app.post('/auth', function(request, response) {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (username == "omer" && password == "aaa111") {
			// If there is an issue with the query, output the error
			// If the account exists
			// Authenticate the user
			request.session.loggedin = true;
			request.session.username = username;			
			// Redirect to home page
			response.redirect('/home');
			response.end();
	} else {
    response.redirect('/');
		response.end();
	}
});
// http://localhost:3000/home
app.get('/home', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		//response.send('Welcome back, ' + request.session.username + '!');
		response.sendFile(path.join(__dirname + '/home.html'));
	} else {
		// Not logged in
		response.sendFile(path.join(__dirname + '/login.html'));		
	}
});

app.listen(3000);