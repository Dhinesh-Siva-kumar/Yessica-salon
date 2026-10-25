# YESSICA Unisex Salon — Full Application

A full-stack rebuild of the YESSICA Unisex Salon landing page, built on the
stack from `YESSICA-Landing-Page-Tech-Spec.md`:

| Layer     | Technology                                      |
|-----------|--------------------------------------------------|
| Frontend  | Angular 20, Angular Material 20, Bootstrap 5.3   |
| Backend   | Express 5, TypeScript 5.7                        |
| Database  | PostgreSQL 14+                                   |
| DB access | Knex 3 query builder over the `pg` driver (no ORM) |
| Auth      | JWT (access + refresh tokens) via `jsonwebtoken` |
| Real-time | Socket.IO 4                                      |
| Maps      | Google Maps API (`@angular/google-maps`)         |

```
yessica-salon/
├── frontend/   Angular 20 app (SCSS, standalone components)
├── backend/    Express 5 + TypeScript API, Knex + PostgreSQL
├── assets/     The real photos, brand logos and fonts extracted from
│               the original design source (also copied into frontend/public)
└── index.html  The original static one-page reproduction (kept for reference)
```

## 1. Prerequisites

- Node.js 20+ (tested on 22)
- A PostgreSQL 14+ server

## 2. Backend setup

```bash
cd backend
cp .env.example .env     # edit DATABASE_URL, JWT secrets, ADMIN_EMAIL/PASSWORD
npm install
createdb yessica         # or: psql -c "CREATE DATABASE yessica"
npm run migrate          # creates all tables
npm run seed             # loads the real YESSICA content + an admin user
npm run dev               # starts the API on http://localhost:4000
```

Health check: `curl http://localhost:4000/health` → `{"ok":true}`.

### API surface

Public (no auth), used by the frontend:
`GET /api/services`, `/api/offers`, `/api/stylists`, `/api/gallery`,
`/api/transformations`, `/api/reviews`, `/api/reels`, `/api/brands`,
`/api/posts`, `/api/site/stats`, `/api/site/contact`.

Booking: `POST /api/bookings` (rate-limited, emits a `booking:new` Socket.IO
event to admins in real time).

Auth: `POST /api/auth/login`, `/api/auth/refresh`, `/api/auth/logout`.

Admin (needs `Authorization: Bearer <accessToken>`): full CRUD under
`/api/admin/{offers,services,stylists,gallery,reviews,brands,reels,
transformations,posts}`, plus `GET/PATCH /api/admin/bookings`,
`PUT /api/admin/site/:key` for the hero stats and contact info, and
`POST /api/admin/site/sync-google-reviews` (below).

### Real Google reviews (hero rating pill + Google Reviews section)

Both currently show the design's placeholder values (`[4.x]`, `+[150] Google
reviews`, `[Paste a real Google review here.]`). To pull the salon's **real**
rating, review count and reviews from Google:

1. Create a key at [console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials) with the **Places API** enabled.
2. Set `GOOGLE_PLACES_API_KEY` in `backend/.env` (and optionally `GOOGLE_PLACE_ID`
   if you already know it — otherwise it's looked up once from
   `GOOGLE_PLACE_QUERY` and cached).
3. Restart the backend — `src/server.ts` syncs once on boot and every 24h
   automatically, writing into `site_settings` (`stats`, `contact`) and the
   `reviews` table. `GET /api/site/stats` and `GET /api/reviews` (what the
   Hero and Reviews components already consume) then serve the real data
   with no frontend changes needed.
4. Or trigger it on demand: `POST /api/admin/site/sync-google-reviews` with
   an admin bearer token.

See `backend/src/lib/google-places.ts` / `sync-google-reviews.ts`.

## 3. Frontend setup

```bash
cd frontend
npm install
npm start          # ng serve — http://localhost:4200, proxies /api to :4000
```

`ng serve` is configured (`proxy.conf.json`) to forward `/api/*` to the
backend on port 4000, so no CORS setup is needed in dev.

Every section component ships with the **real YESSICA content** as its
default `@Input` (see `src/app/core/fallback-data.ts`), so the site looks
complete even before the backend/database is running — once the API
responds, `pages/home/home.ts` swaps in the live data automatically.

### Google Maps

The Contact section renders a live `<google-map>` once you set
`googleMapsApiKey` in `frontend/src/environments/environment.ts`. Until then
it shows the same placeholder panel the original design used.

## 4. What's wired vs. what's still a placeholder

Carried over verbatim from the original design (`YESSICA-Landing-Page-Tech-Spec.md`
§4): opening hours, full address, phone number, real Google reviews, the hero
stat counts (`[00]`, `[4.x]`, …), the footer company credit, and most photos
(only the salon interior, reception desk, and the four real brand logos were
recoverable from the original export — services/stylists/gallery/reel photos
are still gradient placeholders, same as the source). Fill these in via the
admin API (or directly in the seed file) once the client supplies them.

## 5. Suggested next steps (from the tech spec)

1. ~~Angular 20 project, global design tokens, fonts, Header and Footer~~ ✅
2. ~~Hero, About, Services, Why Choose~~ ✅
3. ~~Offers slider, Stylists, Gallery, Before/After, Reels, Reviews~~ ✅
4. ~~Express 5 API and PostgreSQL schema~~ ✅ — replace remaining static
   images with real uploads once the client provides them
5. Admin login screen + dashboard UI (the API is ready: `/api/auth/*`,
   `/api/admin/*`); wire a Socket.IO client to `booking:new` for live alerts
6. Angular SSR, LocalBusiness structured data, image optimization
   (WebP/AVIF + width variants), lazy-loading below the hero
