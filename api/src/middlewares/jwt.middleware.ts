import { expressjwt, GetVerificationKey } from "express-jwt";
import jwksRsa from "jwks-rsa";

const ISSUER = process.env["AUTH0_ISSUER"];
const AUDIENCE = process.env["AUDIENCE"];

export const checkJWT = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${ISSUER}.well-known/jwks.json`,
  }) as GetVerificationKey,
  issuer: ISSUER,
  audience: AUDIENCE,
  algorithms: ["RS256"],
});
