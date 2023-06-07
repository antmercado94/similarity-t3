import {
  type NextApiHandler,
  type NextApiRequest,
  type NextApiResponse,
} from "next";

// middleware for api routes, limit req method types

export function withMethods(methods: string[], handler: NextApiHandler) {
  return function (req: NextApiRequest, res: NextApiResponse) {
    if (!req.method || !methods.includes(req.method)) {
      return res.status(405).end();
    }
    return handler(req, res);
  };
}
