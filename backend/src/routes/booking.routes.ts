import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import { db } from '../db/knex.js';
import { emitNewBooking } from '../io.js';

export const bookingRouter = Router();

const bookingLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many booking requests — please try again later.' },
});

const bookingSchema = z.object({
  name: z.string().min(1).max(120),
  phone: z.string().min(7).max(20),
  service: z.string().min(1).max(160),
  preferredDate: z.string().min(1),
  preferredTime: z.string().min(1),
  notes: z.string().max(500).optional(),
});

bookingRouter.post('/bookings', bookingLimiter, async (req, res, next) => {
  try {
    const payload = bookingSchema.parse(req.body);

    const [row] = await db('bookings')
      .insert({
        name: payload.name,
        phone: payload.phone,
        service: payload.service,
        preferred_date: payload.preferredDate,
        preferred_time: payload.preferredTime,
        notes: payload.notes ?? null,
      })
      .returning(['id', 'name', 'phone', 'service', 'preferred_date', 'preferred_time', 'status']);

    emitNewBooking(row);
    res.status(201).json({ id: row.id });
  } catch (err) { next(err); }
});
