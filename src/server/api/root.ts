import { createTRPCRouter } from "~/server/api/trpc";
import { genKeysRouter } from "./routers/genKeys";
import { apiRequestRouter } from "./routers/apiRequest";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  genKeys: genKeysRouter,
  apiRequest: apiRequestRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
