import knexLib from 'knex';
import type { Knex } from 'knex';
import config from '../knexfile.js';

export const db: Knex = knexLib(config);
