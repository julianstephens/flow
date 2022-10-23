import { UserCtrl } from "@controllers/index";
import { Req } from "@tsed/common";
import { Inject } from "@tsed/di";
import { Unauthorized } from "@tsed/exceptions";
import { Arg, OnVerify, Protocol } from "@tsed/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Protocol({
  name: "jwt",
  useStrategy: Strategy,
  settings: {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "thisismysupersecretprivatekey1",
    issuer: process.env.AUTH0_ISSUER || "localhost",
    audience: process.env.AUTH0_AUDIENCE ||"localhost",
  },
})
export class JwtProtocol implements OnVerify {
  @Inject()
  userCtrl: UserCtrl;

  async $onVerify(@Req() req: Req, @Arg(0) jwtPayload: any) {
    const user = this.userCtrl.get(jwtPayload.sub);

    if (!user) {
      throw new Unauthorized("Wrong token");
    }

    req.user = user;

    return user;
  }
}
