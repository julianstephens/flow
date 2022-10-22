import { Protocol } from "@tsed/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

const { AUTH0_AUDIENCE, AUTH0_ISSUER, JWT_SECRET } = process.env;

@Protocol({
  name: "jwt",
  useStrategy: Strategy,
  settings: {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
    issue: AUTH0_ISSUER,
    audience: AUTH0_AUDIENCE,
  },
})
export class JWTProtocol {
  // @Inject()
}
