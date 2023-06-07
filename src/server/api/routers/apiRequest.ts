import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "~/server/api/trpc";

export const apiRequestRouter = createTRPCRouter({
  getAll: privateProcedure
    .input(
      z.object({
        apiKeys: z
          .object({
            id: z.string(),
            key: z.string(),
            enabled: z.boolean(),
            userId: z.string(),
          })
          .array(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.apiRequest.findMany({
        where: {
          apiKeyId: {
            in: input.apiKeys.map((key) => key.id),
          },
        },
      });
    }),
  create: publicProcedure
    .input(
      z.object({
        duration: z.number(),
        method: z.string(),
        path: z.string(),
        status: z.number(),
        apiKeyId: z.string(),
        usedApiKey: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.apiRequest.create({
        data: {
          duration: input.duration,
          method: input.method,
          path: input.path,
          status: input.status,
          apiKeyId: input.apiKeyId,
          usedApiKey: input.usedApiKey,
        },
      });
    }),
});
