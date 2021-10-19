exports.up = function(knex) {
	return knex.schema.createTable('positions_references', function(table) {
		table.uuid('id')
			.primary()
			.defaultTo(knex.raw('uuid_generate_v4()'));
    table.integer('id_local');
		table.string('name', 300);
    table.float('latitude',8,6);
    table.float('longitude',8,6);
    table.integer('id_customer');
		table.timestamp('created_at', { useTz: true })
			.defaultTo(knex.fn.now());
		table.timestamp('updated_at', { useTz: true })
			.defaultTo(knex.fn.now());
		table.boolean('active').defaultTo(false);
	})
};

exports.down = function(knex) {
	return knex.schema.dropTable('positions_references');
};