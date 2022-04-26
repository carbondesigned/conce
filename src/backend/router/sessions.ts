import { z } from 'zod';
import { prisma } from '@/db/client';
import { createRouter } from './context';
import { createSessionValidator } from 'src/shared/create-session-validator';

export const sessionRouter = createRouter()
  .query('get-all-sessions', {
    async resolve({ ctx }) {
      const sessions = await prisma.session.findMany({
        where: {
          userId: ctx.token,
        },
      });
      return sessions;
    },
  })
  .query('get-session-by-id', {
    input: z.object({ id: z.string() }),
    async resolve({ input, ctx }) {
      const session = await prisma.session.findFirst({
        where: {
          id: input.id,
        },
      });
      if (!session) return null;
      if (session.userId !== ctx.token) return null;
      return session;
    },
  })
  .mutation('create-session', {
    input: createSessionValidator,
    async resolve({ input, ctx }) {
      return await prisma.session.create({
        data: {
          ...input,
          userId: ctx.token ?? '',
        },
      });
    },
  });
