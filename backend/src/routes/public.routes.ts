import { Router } from 'express';
import { db } from '../db/knex.js';

export const publicRouter = Router();

publicRouter.get('/services', async (_req, res, next) => {
  try {
    const rows = await db('services').select('id', 'n', 'title', 'text', 'img_url as imgUrl').orderBy('sort_order');
    res.json(rows);
  } catch (err) { next(err); }
});

publicRouter.get('/offers', async (_req, res, next) => {
  try {
    const rows = await db('offers').where({ active: true }).select('id', 'n', 'title', 'price').orderBy('sort_order');
    res.json(rows);
  } catch (err) { next(err); }
});

publicRouter.get('/stylists', async (_req, res, next) => {
  try {
    const rows = await db('stylists').select('id', 'name', 'role', 'text', 'img_url as imgUrl', 'initials').orderBy('sort_order');
    res.json(rows);
  } catch (err) { next(err); }
});

publicRouter.get('/gallery', async (_req, res, next) => {
  try {
    const rows = await db('gallery_items')
      .select('id', 'label', 'img_url as imgUrl', 'col_span as colSpan', 'row_span as rowSpan')
      .orderBy('sort_order');
    res.json(rows);
  } catch (err) { next(err); }
});

publicRouter.get('/transformations', async (_req, res, next) => {
  try {
    const rows = await db('transformations')
      .select('id', 'title', 'before_url as beforeUrl', 'after_url as afterUrl')
      .orderBy('sort_order');
    res.json(rows);
  } catch (err) { next(err); }
});

publicRouter.get('/reviews', async (_req, res, next) => {
  try {
    const rows = await db('reviews').where({ published: true }).select('id', 'text', 'name').orderBy('sort_order');
    res.json(rows);
  } catch (err) { next(err); }
});

publicRouter.get('/reels', async (_req, res, next) => {
  try {
    const rows = await db('reels')
      .select('id', 'width_em as widthEm', 'z', 'opacity', 'video_url as url', 'thumbnail_url as thumbUrl')
      .orderBy('sort_order');
    res.json(rows);
  } catch (err) { next(err); }
});

publicRouter.get('/brands', async (_req, res, next) => {
  try {
    const rows = await db('brands').select('id', 'name', 'logo_url as logoUrl', 'height_px as heightPx').orderBy('sort_order');
    res.json(rows);
  } catch (err) { next(err); }
});

publicRouter.get('/posts', async (_req, res, next) => {
  try {
    const rows = await db('posts').select('id', 'label', 'img_url as imgUrl', 'post_url as postUrl').orderBy('sort_order');
    res.json(rows);
  } catch (err) { next(err); }
});

publicRouter.get('/site/stats', async (_req, res, next) => {
  try {
    const row = await db('site_settings').where({ key: 'stats' }).first();
    res.json(row?.value ?? {});
  } catch (err) { next(err); }
});

publicRouter.get('/site/contact', async (_req, res, next) => {
  try {
    const row = await db('site_settings').where({ key: 'contact' }).first();
    res.json(row?.value ?? {});
  } catch (err) { next(err); }
});
