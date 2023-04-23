import { PlaidService } from "@/plaid.service";
import env from "@/utils/env";
import { Injectable } from "@nestjs/common";
import {
  CountryCode,
  LinkTokenCreateRequest,
  LinkTokenCreateResponse,
  Products,
} from "plaid";

@Injectable()
export class AuthService {
  constructor(private readonly plaidSVC: PlaidService) {}

  async createLinkToken(userId: string): Promise<LinkTokenCreateResponse> {
    const linkTokenReq: LinkTokenCreateRequest = {
      client_name: env.APP_NAME,
      user: {
        client_user_id: userId,
      },
      products: [Products.Transactions],
      country_codes: [CountryCode.Us],
      language: "en",
    };

    try {
      const { data } = await this.plaidSVC.plaid.linkTokenCreate(linkTokenReq);
      return data;
    } catch (err) {
      throw err;
    }
  }
}
