
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table) {
      table.increments();
      table.string('username').unique();
      table.string('password_hash');
    }),
    knex.schema.createTable('broncos', function(table) {
      table.increments('id');
      table.string('name');
      table.string('favorite_color');
      table.integer('favorite_number').default(-1);
      table.integer('iq').default(3);
      table.integer('height').default(72);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('users'),
    knex.schema.dropTableIfExists('broncos')
  ]);
};
