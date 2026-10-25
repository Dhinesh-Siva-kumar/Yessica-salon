import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import bcrypt from 'bcryptjs';
import crypto from 'node:crypto';
import { z } from 'zod';
import { db } from '../db/knex.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../lib/jwt.js';

export const authRouter = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

authRouter.post('/login', loginLimiter, async (req, res, next) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const admin = await db('admin_users').where({ email }).first();
    if (!admin || !(await bcrypt.compare(password, admin.password_hash))) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    const payload = { sub: admin.id, email: admin.email };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    await db('refresh_tokens').insert({
      admin_user_id: admin.id,
      token_hash: hashToken(refreshToken),
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    res.json({ accessToken, refreshToken, admin: { id: admin.id, email: admin.email, name: admin.name } });
  } catch (err) { next(err); }
});

const refreshSchema = z.object({ refreshToken: z.string().min(1) });

authRouter.post('/refresh', async (req, res, next) => {
  try {
    const { refreshToken } = refreshSchema.parse(req.body);
    const payload = verifyRefreshToken(refreshToken);

    const stored = await db('refresh_tokens')
      .where({ admin_user_id: payload.sub, token_hash: hashToken(refreshToken) })
      .whereNull('revoked_at')
      .where('expires_at', '>', new Date())
      .first();

    if (!stored) {
      res.status(401).json({ error: 'Refresh token is invalid or expired' });
      return;
    }

    const accessToken = signAccessToken({ sub: payload.sub, email: payload.email });
    res.json({ accessToken });
  } catch {
    res.status(401).json({ error: 'Refresh token is invalid or expired' });
  }
});

authRouter.post('/logout', async (req, res, next) => {
  try {
    const { refreshToken } = refreshSchema.parse(req.body);
    await db('refresh_tokens').where({ token_hash: hashToken(refreshToken) }).update({ revoked_at: new Date() });
    res.status(204).send();
  } catch (err) { next(err); }
});
