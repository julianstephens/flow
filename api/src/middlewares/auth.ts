import { expressjwt, GetVerificationKey } from "express-jwt";
import jwksRsa from "jwks-rsa";

const AUTH0_CONFIG = {
  issuer: process.env.AUTH0_ISSUER,
  audience: process.env.AUTH0_AUDIENCE,
  algorithms: ["RS256"],
};

const exSecret: GetVerificationKey = jwksRsa.expressJwtSecret({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: `${AUTH0_CONFIG.issuer}.well-known/jwks.json`,
});

export const requireAuthorization = expressjwt({
  secret: exSecret,
  ...AUTH0_CONFIG,
});
