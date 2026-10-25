import type { Knex } from 'knex';
import 'dotenv/config';

const config: Knex.Config = {
  client: 'pg',
  connection: process.env['DATABASE_URL'] || 'postgres://postgres:postgres@localhost:5432/yessica',
  migrations: {
    directory: './src/migrations',
    extension: 'ts',
  },
  seeds: {
    directory: './src/seeds',
    extension: 'ts',
  },
  pool: { min: 2, max: 10 },
};

export default config;
