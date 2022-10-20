
exports.up = function (knex) {
    return knex.schema.alterTable('positions_references', function (table) {
        table.string('city', 300);
    });
}

exports.down = function (knex) {
    return knex.schema.alterTable('positions_references', function (table) {
        table.dropColumn('city');
    });

};
