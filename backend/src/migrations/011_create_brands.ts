import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('brands', (t) => {
    t.increments('id').primary();
    t.string('name').notNullable();
    t.string('logo_url').notNullable();
    t.integer('height_px').notNullable().defaultTo(56);
    t.integer('sort_order').notNullable().defaultTo(0);
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('brands');
}
