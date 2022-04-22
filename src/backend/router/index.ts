import superjson from 'superjson';
import { sessionRouter } from './sessions';
import { createRouter } from './context';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('sessions.', sessionRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
