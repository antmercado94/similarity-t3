import { User } from "@clerk/nextjs/dist/types/server";

export interface ClerkSSRState {
  sessionId: string;
  userId: string;
  user: User;
  sessionClaims: {
    azp: string;
    exp: number;
    iat: number;
    iss: string;
    nbf: number;
    sid: string;
    sub: string;
  };
}
