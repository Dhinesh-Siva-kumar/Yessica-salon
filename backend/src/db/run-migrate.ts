import { db } from './knex.js';

const [, , direction] = process.argv;

async function main() {
  if (direction === 'down') {
    const [batch, log] = await db.migrate.rollback();
    console.log(`Rolled back batch ${batch}:`, log);
  } else {
    const [batch, log] = await db.migrate.latest();
    if (log.length === 0) {
      console.log('Already up to date.');
    } else {
      console.log(`Batch ${batch} ran:`, log);
    }
  }
  await db.destroy();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
