import { Middleware } from "@tsed/platform-middlewares";
import { expressjwt, GetVerificationKey } from "express-jwt";
import jwksRsa from "jwks-rsa";

const { AUDIENCE, AUTH0_ISSUER } = process.env;

@Middleware()
export const checkJWT = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${AUTH0_ISSUER}.well-known/jwks.json`,
  }) as GetVerificationKey,
  issuer: AUTH0_ISSUER,
  audience: AUDIENCE,
  algorithms: ["RS256"],
});
