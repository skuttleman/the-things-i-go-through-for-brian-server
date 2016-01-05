var knex = require('knex')(require('../knexfile.js')[process.env.ENVIRONMENT || 'development']);
module.exports = function(table, keys) {
  var route = require('express').Router();

  // C
  route.post('/', function(request, response) {
    var rowData = sanitize(request.body, keys || []);
    knex(table).returning('*').insert(rowData)
    .then(function(rows) {
      response.json({ [table]: rows[0] });
    });
  });

  // R
  route.get('/:id', function(request, response) {
    knex(table).where({ id: request.params.id })
    .then(function(rows) {
      response.json({ [table]: rows[0] });
    });
  });

  // U
  route.put('/:id', function(request, response) {
    var rowData = sanitize(request.body, keys || []);
    knex(table).returning('*').where({ id: request.params.id }).update(rowData)
    .then(function(rows) {
      response.json({ [table]: rows[0] });
    });
  });

  // D
  route.delete('/:id', function(request, response) {
    knex(table).where({ id: request.params.id }).del()
    .then(function(id) {
      response.json({ success: true, message: ['Record', id, 'deleted from table', table].join(' ') });
    });
  });

  // L
  route.get('/', function(request, response) {
    knex(table)
    .then(function(rows) {
      response.json({ [table]: rows });
    });
  });

  return route;
}

function sanitize(body, keys) {
  return keys.reduce(function(rowData, key) {
    if (body[key.name]) rowData[key.name] = body[key.name];
    return rowData;
  }, {});
}
