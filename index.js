try {
	require('dotenv').load();
} catch (err) {
	console.error(err);
}
var express = require('express'), app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var LocalStrategy = require('passport-local');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


var crudl = require('./routes/crudl');
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
