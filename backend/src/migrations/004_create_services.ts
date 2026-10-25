import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('services', (t) => {
    t.increments('id').primary();
    t.string('n').notNullable(); // display number, e.g. "01"
    t.string('title').notNullable();
    t.text('text').notNullable();
    t.string('img_url').nullable();
    t.integer('sort_order').notNullable().defaultTo(0);
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('services');
}
