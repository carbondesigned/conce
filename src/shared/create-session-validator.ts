import { z } from 'zod';

export const createSessionValidator = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string().nullable(),
});

export type CreateSessionInputType = z.infer<typeof createSessionValidator>;
