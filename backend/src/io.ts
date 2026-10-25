import type { Server as HttpServer } from 'node:http';
import { Server, type Socket } from 'socket.io';

let io: Server | undefined;

export function initIo(httpServer: HttpServer, corsOrigin: string): Server {
  io = new Server(httpServer, {
    cors: { origin: corsOrigin },
  });

  io.on('connection', (socket: Socket) => {
    // Admin dashboard clients join this room to receive booking alerts.
    socket.on('admin:subscribe', () => {
      socket.join('admin');
    });
  });

  return io;
}

export function emitNewBooking(booking: Record<string, unknown>): void {
  io?.to('admin').emit('booking:new', booking);
}

export function emitSlotUpdate(payload: Record<string, unknown>): void {
  io?.to('admin').emit('slots:update', payload);
}
