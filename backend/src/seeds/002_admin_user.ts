import type { Knex } from 'knex';
import bcrypt from 'bcryptjs';

export async function seed(knex: Knex): Promise<void> {
  const email = process.env['ADMIN_EMAIL'] || 'admin@yessicasalon.com';
  const password = process.env['ADMIN_PASSWORD'] || 'change-me-now';

  const existing = await knex('admin_users').where({ email }).first();
  if (existing) return;

  const passwordHash = await bcrypt.hash(password, 10);
  await knex('admin_users').insert({
    email,
    password_hash: passwordHash,
    name: 'YESSICA Admin',
  });

  console.log(`Seeded admin user ${email} — change the password after first login.`);
}
