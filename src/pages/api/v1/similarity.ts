import type { NextApiRequest, NextApiResponse } from "next";
import requestIp from "request-ip";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";
import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";
import { openai } from "~/utils/openai";
import { withMethods } from "~/utils/api-middlewares/with-methods";
import { cosineSimilarity } from "~/helpers/cosine-similarity";

const reqSchema = z.object({
  text1: z.string().max(1000),
  text2: z.string().max(1000),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Create context and caller
  const ctx = createTRPCContext({ req, res });
  const caller = appRouter.createCaller(ctx);

  try {
    const body = req.body as unknown;
    const apiKey = req.headers.authorization;
    const ip = requestIp.getClientIp(req) ?? "127.0.0.1";

    const { text1, text2 } = reqSchema.parse(body);

    if (!apiKey) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
      });
    }

    const validApiKey = await caller.genKeys.getKey({ apiKey, ip });

    if (!validApiKey) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
      });
    }
    const start = new Date();

    const embeddings = await Promise.all(
      [text1, text2].map(async (text) => {
        // using openAI to transform text into mathematical vector */
        const res = await openai.createEmbedding({
          model: "text-embedding-ada-002",
          input: text,
        });

        return res.data.data[0]?.embedding;
      })
    );

    if (!embeddings[0] || !embeddings[1])
      throw new Error("Could not create text embeddings");

    const similarity = cosineSimilarity(embeddings[0], embeddings[1]);

    // operation time
    const duration = new Date().getTime() - start.getTime();

    // persist request
    await caller.apiRequest.create({
      duration,
      method: req.method as string,
      path: req.url as string,
      status: 200,
      apiKeyId: validApiKey.id,
      usedApiKey: validApiKey.key,
    });

    return res.status(200).json({
      success: true,
      text1,
      text2,
      similarity,
    });
  } catch (cause) {
    if (cause instanceof TRPCError) {
      // An error from tRPC occured
      const httpCode = getHTTPStatusCodeFromError(cause);
      return res.status(httpCode).json(cause);
    }
    // zod schema errors
    if (cause instanceof z.ZodError) {
      return res.status(400).json({ error: cause.issues });
    }
    // Another error occured
    res.status(500).json({ message: "Internal server error" });
  }
};

export default withMethods(["POST"], handler);
