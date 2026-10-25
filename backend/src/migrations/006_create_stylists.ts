import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('stylists', (t) => {
    t.increments('id').primary();
    t.string('name').notNullable();
    t.string('role').notNullable();
    t.text('text').notNullable();
    t.string('img_url').nullable();
    t.string('initials', 4).notNullable();
    t.integer('sort_order').notNullable().defaultTo(0);
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('stylists');
}
