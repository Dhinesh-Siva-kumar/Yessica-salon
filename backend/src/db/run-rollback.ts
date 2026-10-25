import { db } from './knex.js';

async function main() {
  const [batch, log] = await db.migrate.rollback();
  console.log(`Rolled back batch ${batch}:`, log);
  await db.destroy();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
