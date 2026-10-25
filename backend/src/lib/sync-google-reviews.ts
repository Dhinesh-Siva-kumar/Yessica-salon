import { db } from '../db/knex.js';
import { findPlaceId, getPlaceDetails } from './google-places.js';

/**
 * Pulls the salon's live rating, review count and reviews from Google Places
 * and writes them into site_settings + the reviews table, replacing the
 * "[Paste a real Google review here.]" placeholders. Safe to call repeatedly
 * (e.g. once a day) — it's idempotent per sync.
 */
export async function syncGoogleReviews(): Promise<{ rating: number | null; reviewCount: number | null }> {
  const apiKey = process.env['GOOGLE_PLACES_API_KEY'];
  if (!apiKey) throw new Error('GOOGLE_PLACES_API_KEY is not set');

  let placeId = process.env['GOOGLE_PLACE_ID'];
  if (!placeId) {
    const cached = await db('site_settings').where({ key: 'google_place_id' }).first();
    placeId = cached?.value?.placeId;
  }
  if (!placeId) {
    const query = process.env['GOOGLE_PLACE_QUERY'] || 'YESSICA Unisex Salon, Karimugal, Kochi';
    placeId = await findPlaceId(apiKey, query);
    await db('site_settings')
      .insert({ key: 'google_place_id', value: JSON.stringify({ placeId }) })
      .onConflict('key')
      .merge();
  }

  const details = await getPlaceDetails(apiKey, placeId);

  const existingStats = await db('site_settings').where({ key: 'stats' }).first();
  const stats = {
    ...(existingStats?.value ?? {}),
    rating: details.rating !== null ? details.rating.toFixed(1) : existingStats?.value?.rating,
    reviewCount: details.userRatingsTotal ?? existingStats?.value?.reviewCount,
    googleRating: details.rating !== null ? details.rating.toFixed(1) : existingStats?.value?.googleRating,
  };
  await db('site_settings').insert({ key: 'stats', value: JSON.stringify(stats) }).onConflict('key').merge();

  if (details.formattedAddress || details.formattedPhoneNumber || details.weekdayText) {
    const existingContact = await db('site_settings').where({ key: 'contact' }).first();
    const contact = {
      ...(existingContact?.value ?? {}),
      address: details.formattedAddress ?? existingContact?.value?.address,
      phone: details.formattedPhoneNumber ?? existingContact?.value?.phone,
      hours: details.weekdayText ? details.weekdayText.join(' · ') : existingContact?.value?.hours,
    };
    await db('site_settings').insert({ key: 'contact', value: JSON.stringify(contact) }).onConflict('key').merge();
  }

  if (details.reviews.length > 0) {
    await db('reviews').del();
    await db('reviews').insert(
      details.reviews.map((rv, i) => ({
        text: rv.text,
        name: rv.authorName,
        rating: rv.rating,
        sort_order: i + 1,
      }))
    );
  }

  return { rating: details.rating, reviewCount: details.userRatingsTotal };
}
