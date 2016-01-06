try {
	require('dotenv').load();
} catch (err) {
	console.error(err);
}
var express = require('express'), app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var authorize = require('./authorize');
var crudl = require('./routes/crudl');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET || 'keyboard cat'));
app.use(cors({ credentials: true, allowedHeaders: ['Authorization'], exposedHeaders: ['Authorization'], origin: process.env.CLIENT_URL || 'http://localhost:8080' }));



app.use(authorize);
app.use('/broncos', crudl('broncos', [
  { name: 'name', type: 'string' },
  { name: 'favorite_color', type: 'string' },
  { name: 'favorite_number', type: 'integer' },
  { name: 'iq', type: 'integer' },
	{ name: 'height', type: 'integer' }
]));



app.listen(process.env.PORT || 8000, function() {
  console.log('The NSA is listening on port', process.env.PORT || 8000);
});
