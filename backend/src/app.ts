import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { publicRouter } from './routes/public.routes.js';
import { bookingRouter } from './routes/booking.routes.js';
import { authRouter } from './routes/auth.routes.js';
import { adminRouter } from './routes/admin.routes.js';
import { errorHandler } from './middleware/error-handler.js';

export function createApp(corsOrigin: string) {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: corsOrigin }));
  app.use(express.json());

  app.get('/health', (_req, res) => res.json({ ok: true }));

  app.use('/api', publicRouter);
  app.use('/api', bookingRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/admin', adminRouter);

  app.use(errorHandler);

  return app;
}
