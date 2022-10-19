
exports.up = function (knex) {
    return knex.schema.alterTable('positions_references', function (table) {
        table.string('cidade', 300);
    });
}

exports.down = function (knex) {
    return knex.schema.alterTable('positions_references', function (table) {
        table.dropColumn('cidade');
    });

};
