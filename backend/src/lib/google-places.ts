/**
 * Thin wrapper around the Google Places API (legacy "Place Details" +
 * "Find Place From Text" endpoints) used to pull the salon's real rating,
 * review count and a handful of real reviews.
 *
 * Needs GOOGLE_PLACES_API_KEY in the environment. GOOGLE_PLACE_ID is optional —
 * if it's missing, findPlaceId() resolves it once from the business name and
 * the caller is expected to persist it (see syncGoogleReviews in admin.routes.ts).
 */

const PLACES_BASE = 'https://maps.googleapis.com/maps/api/place';

export interface GoogleReview {
  authorName: string;
  rating: number;
  text: string;
  relativeTime: string;
  time: number;
}

export interface GooglePlaceDetails {
  placeId: string;
  name: string;
  rating: number | null;
  userRatingsTotal: number | null;
  formattedAddress: string | null;
  formattedPhoneNumber: string | null;
  weekdayText: string[] | null;
  reviews: GoogleReview[];
}

async function callPlacesApi<T>(path: string, params: Record<string, string>): Promise<T> {
  const url = new URL(`${PLACES_BASE}/${path}/json`);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`Google Places API HTTP ${res.status}`);
  }
  const body = await res.json() as { status: string; error_message?: string } & T;
  if (body.status !== 'OK') {
    throw new Error(`Google Places API status ${body.status}: ${body.error_message ?? 'no details'}`);
  }
  return body;
}

export async function findPlaceId(apiKey: string, textQuery: string): Promise<string> {
  const data = await callPlacesApi<{ candidates: Array<{ place_id: string }> }>('findplacefromtext', {
    input: textQuery,
    inputtype: 'textquery',
    fields: 'place_id',
    key: apiKey,
  });

  const placeId = data.candidates[0]?.place_id;
  if (!placeId) throw new Error(`No Google Place found for "${textQuery}"`);
  return placeId;
}

export async function getPlaceDetails(apiKey: string, placeId: string): Promise<GooglePlaceDetails> {
  const data = await callPlacesApi<{
    result: {
      place_id: string;
      name: string;
      rating?: number;
      user_ratings_total?: number;
      formatted_address?: string;
      formatted_phone_number?: string;
      opening_hours?: { weekday_text?: string[] };
      reviews?: Array<{
        author_name: string;
        rating: number;
        text: string;
        relative_time_description: string;
        time: number;
      }>;
    };
  }>('details', {
    place_id: placeId,
    fields: 'place_id,name,rating,user_ratings_total,formatted_address,formatted_phone_number,opening_hours,reviews',
    key: apiKey,
  });

  const r = data.result;
  return {
    placeId: r.place_id,
    name: r.name,
    rating: r.rating ?? null,
    userRatingsTotal: r.user_ratings_total ?? null,
    formattedAddress: r.formatted_address ?? null,
    formattedPhoneNumber: r.formatted_phone_number ?? null,
    weekdayText: r.opening_hours?.weekday_text ?? null,
    reviews: (r.reviews ?? []).map((rv) => ({
      authorName: rv.author_name,
      rating: rv.rating,
      text: rv.text,
      relativeTime: rv.relative_time_description,
      time: rv.time,
    })),
  };
}
