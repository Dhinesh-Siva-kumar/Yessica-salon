import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('bookings', (t) => {
    t.increments('id').primary();
    t.string('name').notNullable();
    t.string('phone').notNullable();
    t.string('service').notNullable();
    t.date('preferred_date').notNullable();
    t.string('preferred_time').notNullable();
    t.text('notes').nullable();
    t.enu('status', ['new', 'confirmed', 'completed', 'cancelled']).notNullable().defaultTo('new');
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('bookings');
}
