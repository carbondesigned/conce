/* Creating a React Query Hooks instance that is configured to use the AppRouter type. */
import { createReactQueryHooks } from '@trpc/react';
import type { AppRouter } from '@/backend/router';

export const trpc = createReactQueryHooks<AppRouter>();
