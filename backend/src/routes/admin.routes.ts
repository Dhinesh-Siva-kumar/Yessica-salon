import { Router } from 'express';
import { db } from '../db/knex.js';
import { requireAuth } from '../middleware/auth.js';
import { emitSlotUpdate } from '../io.js';
import { syncGoogleReviews } from '../lib/sync-google-reviews.js';

export const adminRouter = Router();
adminRouter.use(requireAuth);

// Pulls the live rating, review count and latest reviews from Google Places.
adminRouter.post('/site/sync-google-reviews', async (_req, res, next) => {
  try {
    const result = await syncGoogleReviews();
    res.json({ ok: true, ...result });
  } catch (err) {
    res.status(502).json({ error: err instanceof Error ? err.message : 'Google sync failed' });
  }
});

/**
 * Mounts simple list/create/update/delete routes over a table so the salon
 * can manage offers, services, stylists, gallery and reviews without a developer.
 */
function crud(path: string, table: string): void {
  adminRouter.get(`/${path}`, async (_req, res, next) => {
    try {
      res.json(await db(table).orderBy('sort_order'));
    } catch (err) { next(err); }
  });

  adminRouter.post(`/${path}`, async (req, res, next) => {
    try {
      const [row] = await db(table).insert(req.body).returning('*');
      res.status(201).json(row);
    } catch (err) { next(err); }
  });

  adminRouter.put(`/${path}/:id`, async (req, res, next) => {
    try {
      const [row] = await db(table).where({ id: req.params['id'] }).update(req.body).returning('*');
      if (!row) { res.status(404).json({ error: 'Not found' }); return; }
      res.json(row);
    } catch (err) { next(err); }
  });

  adminRouter.delete(`/${path}/:id`, async (req, res, next) => {
    try {
      const count = await db(table).where({ id: req.params['id'] }).del();
      if (!count) { res.status(404).json({ error: 'Not found' }); return; }
      res.status(204).send();
    } catch (err) { next(err); }
  });
}

crud('offers', 'offers');
crud('services', 'services');
crud('stylists', 'stylists');
crud('gallery', 'gallery_items');
crud('reviews', 'reviews');
crud('brands', 'brands');
crud('reels', 'reels');
crud('transformations', 'transformations');
crud('posts', 'posts');

// Bookings: list + status updates (new / confirmed / completed / cancelled).
adminRouter.get('/bookings', async (req, res, next) => {
  try {
    const { status } = req.query;
    const query = db('bookings').orderBy('created_at', 'desc');
    if (typeof status === 'string') query.where({ status });
    res.json(await query);
  } catch (err) { next(err); }
});

adminRouter.patch('/bookings/:id/status', async (req, res, next) => {
  try {
    const status = req.body?.status;
    if (!['new', 'confirmed', 'completed', 'cancelled'].includes(status)) {
      res.status(400).json({ error: 'Invalid status' });
      return;
    }
    const [row] = await db('bookings').where({ id: req.params['id'] }).update({ status }).returning('*');
    if (!row) { res.status(404).json({ error: 'Not found' }); return; }
    emitSlotUpdate({ bookingId: row.id, status: row.status });
    res.json(row);
  } catch (err) { next(err); }
});

// Site settings (hero stats, contact info) stored as key/value JSON.
adminRouter.put('/site/:key', async (req, res, next) => {
  try {
    await db('site_settings')
      .insert({ key: req.params['key'], value: JSON.stringify(req.body) })
      .onConflict('key')
      .merge();
    res.json(req.body);
  } catch (err) { next(err); }
});
