try {
	require('dotenv').load();
} catch (err) {
	console.error(err);
}
var express = require('express'), app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


var crudl = require('./routes/crudl');
//app.use('/route', crudl('<table_name>', [
  { name: 'column1', type: 'integer' },
  { name: 'column2', type: 'string' },
  { name: 'column3', type: 'boolean' },
  { name: 'column3', type: 'datetime' }
]));

app.get('/*', function(request, response) {
	response.send('I am here to serve you.');
});

app.listen(process.env.PORT || 8000, function() {
  console.log('The NSA is listening on port', process.env.PORT || 8000);
});

