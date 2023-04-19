import { Controller } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ApiTags } from "@nestjs/swagger";
import { LinkService } from "./link.service";

@Controller({
  path: "link",
})
@ApiTags("Link")
export class LinkController {
  constructor(
    private readonly linkSVC: LinkService,
    private configSVC: ConfigService
  ) {}
}
