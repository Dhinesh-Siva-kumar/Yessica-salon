import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('transformations', (t) => {
    t.increments('id').primary();
    t.string('title').notNullable();
    t.string('before_url').nullable();
    t.string('after_url').nullable();
    t.integer('sort_order').notNullable().defaultTo(0);
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('transformations');
}
