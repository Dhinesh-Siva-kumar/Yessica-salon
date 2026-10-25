import { db } from './knex.js';

async function main() {
  const [log] = await db.seed.run();
  console.log('Seeds ran:', log);
  await db.destroy();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
