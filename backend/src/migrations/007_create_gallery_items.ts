import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('gallery_items', (t) => {
    t.increments('id').primary();
    t.string('label').notNullable();
    t.string('img_url').nullable();
    t.integer('col_span').notNullable().defaultTo(1);
    t.integer('row_span').notNullable().defaultTo(1);
    t.integer('sort_order').notNullable().defaultTo(0);
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('gallery_items');
}
