var route = require('express').Router();
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV || 'development']);
var bcrypt = require('bcrypt');
module.exports = route;



passport.use(new LocalStrategy(function (username, password, done) {
  login(username, password)
  .then(function (results) {
    done(null, results);
  }).catch(function (error) {
    done(error);
  });
}));
passport.serializeUser(function (user, done) {
  done(null, JSON.stringify(user));
});
passport.deserializeUser(function (user, done) {
  done(null, JSON.parse(user));
});




route.use(session({
  secret: process.env.PASSPORT_SECRET,
  resave: true,
  saveUninitialized: true
}));

route.use(passport.initialize());
route.use(passport.session());



route.post('/login', passport.authenticate('local'), function(request, response) {
  setCookie(response, JSON.stringify(request.user));
  response.json({ success: true, userID: request.user.id });
});

route.post('/logout', function(request, response) {
  setCookie(response, '');
  request.logout();
  response.json({ success: true });
});

route.post('/signup', function(request, response) {
	knex('users').where({ username: request.body.username }).then(function(users) {
		if (!users.length) {
			var hash = bcrypt.hashSync(request.body.password, 8);
			return knex('users').insert({ username: request.body.username, password_hash: hash });
		} else {
			return Promise.reject('User already exists');
		}
	}).then(function(err) {
		console.error(err);
		response.err(err);
	});
});

function login(user, password) {
	return knex('users').where({ username: user }).then(function(users) {
		var user = users[0];
		if (user && bcrypt.compareSync(password, user.password_hash)) {
			return Promise.resolve(user);
		} else {
			return Promise.reject('Username or password does not match');
		}
	});
}

function setCookie(response, cookie) {
  response.cookie('user', cookie, { signed: !!cookie, httpOnly: false });
}
