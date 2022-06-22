/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from '~/server/createRouter';
import { prisma } from '~/server/prisma';

/**
 * Default selector for Post.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */
const defaultSessionSelect = Prisma.validator<Prisma.SessionSelect>()({
  id: true,
  title: true,
  description: true,
  cover: true,
  tags: true,
  location: true,
  startTime: true,
  endTime: true,
  createdAt: true,
  updatedAt: true,
});

export const sessionRouter = createRouter()
  // create
  .mutation('add', {
    input: z.object({
      id: z.string().uuid().optional(),
      title: z.string().min(1).max(32),
      description: z.string().optional(),
      cover: z.string().optional(),
      tags: z.string().array().optional(),
      location: z.string().optional(),
      startTime: z.string().optional(),
      endTime: z.string().optional(),
      createdAt: z.string().optional(),
      updatedAt: z.string().optional(),
    }),
    async resolve({ input }) {
      const session = await prisma.session.create({
        data: input,
        select: defaultSessionSelect,
      });
      return session;
    },
  })
  // read
  .query('all', {
    async resolve() {
      /**
       * For pagination you can have a look at this docs site
       * @link https://trpc.io/docs/useInfiniteQuery
       */

      return prisma.session.findMany({
        select: defaultSessionSelect,
      });
    },
  })
  .query('byId', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      const { id } = input;
      const session = await prisma.session.findUnique({
        where: { id },
        select: defaultSessionSelect,
      });
      if (!session) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No session with id '${id}'`,
        });
      }
      return session;
    },
  })
  // update
  .mutation('edit', {
    input: z.object({
      id: z.string().uuid(),
      data: z.object({
        title: z.string().min(1).max(32).optional(),
        text: z.string().min(1).optional(),
      }),
    }),
    async resolve({ input }) {
      const { id, data } = input;
      const session = await prisma.session.update({
        where: { id },
        data,
        select: defaultSessionSelect,
      });
      return session;
    },
  })
  // delete
  .mutation('delete', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      const { id } = input;
      await prisma.session.delete({ where: { id } });
      return {
        id,
      };
    },
  });
