import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('reels', (t) => {
    t.increments('id').primary();
    t.string('video_url').nullable();
    t.string('thumbnail_url').nullable();
    t.float('width_em').notNullable().defaultTo(14);
    t.integer('z').notNullable().defaultTo(1);
    t.float('opacity').notNullable().defaultTo(0.9);
    t.integer('sort_order').notNullable().defaultTo(0);
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('reels');
}
