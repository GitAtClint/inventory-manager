/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('item', table => {
        table.increments().primary();
        table.integer('user_id').references('id').inTable('user').notNullable();
        table.string('item_name').notNullable();
        table.string('description').notNullable();
        table.integer('quantity').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('item', table => {
        table.dropForeign('user_id');
    })
    .then(function() {
        return knex.schema.dropTableIfExists('item');
    });
};
