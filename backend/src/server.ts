import 'dotenv/config';
import { createServer } from 'node:http';
import { createApp } from './app.js';
import { initIo } from './io.js';
import { syncGoogleReviews } from './lib/sync-google-reviews.js';

const PORT = Number(process.env['PORT'] ?? 4000);
const CORS_ORIGIN = process.env['CORS_ORIGIN'] || 'http://localhost:4200';
const DAY_MS = 24 * 60 * 60 * 1000;

const app = createApp(CORS_ORIGIN);
const httpServer = createServer(app);

initIo(httpServer, CORS_ORIGIN);

httpServer.listen(PORT, () => {
  console.log(`YESSICA API listening on http://localhost:${PORT}`);

  if (process.env['GOOGLE_PLACES_API_KEY']) {
    const run = () => syncGoogleReviews()
      .then((r) => console.log(`Google reviews synced — rating ${r.rating}, ${r.reviewCount} reviews`))
      .catch((err) => console.error('Google reviews sync failed:', err.message));
    run();
    setInterval(run, DAY_MS);
  }
});
