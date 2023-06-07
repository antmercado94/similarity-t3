import { z } from "zod";
import { nanoid } from "nanoid";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "~/server/api/trpc";

// Create a new ratelimiter, that allows 5 requests per 1 hour
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 h"),
  analytics: true,
  /**
   * Optional prefix for the keys used in redis. This is useful if you want to share a redis
   * instance with other applications and want to avoid key collisions. The default prefix is
   * "@upstash/ratelimit"
   */
  prefix: "@upstash/ratelimit",
});

export const genKeysRouter = createTRPCRouter({
  get: privateProcedure
    .input(
      z.object({
        userId: z.string(),
        enabled: z.boolean(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.apiKey.findFirst({
        where: {
          userId: input.userId,
          enabled: input.enabled,
        },
      });
    }),
  getAll: privateProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.apiKey.findMany({
        where: {
          userId: input.userId,
        },
      });
    }),
  create: privateProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.userId;

    const existingApiKey = await ctx.prisma.apiKey.findFirst({
      where: { userId, enabled: true },
    });

    if (existingApiKey) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "You already have a valid API Key",
      });
    }

    const apiKey = await ctx.prisma.apiKey.create({
      data: {
        userId,
        key: nanoid(),
      },
    });

    return apiKey;
  }),
  revoke: privateProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.userId;

    // find user's valid/enabled api key
    const validApiKey = await ctx.prisma.apiKey.findFirst({
      where: { userId, enabled: true },
    });

    if (!validApiKey) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "This API key could not be revoked",
      });
    }

    const revokedKey = await ctx.prisma.apiKey.update({
      where: { id: validApiKey.id },
      data: {
        enabled: false,
      },
    });

    if (!revokedKey) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "This API key could not be revoked",
      });
    }

    return revokedKey;
  }),
  getKey: publicProcedure
    .input(
      z.object({
        apiKey: z.string(),
        ip: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      // rate limit public requests
      const { success } = await ratelimit.limit(input.ip);
      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      const apiKey = await ctx.prisma.apiKey.findFirst({
        where: {
          key: input.apiKey,
          enabled: true,
        },
      });

      return apiKey;
    }),
});
