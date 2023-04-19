import { Injectable, OnModuleInit } from "@nestjs/common";
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";
import env from "./utils/env";

@Injectable()
export class PlaidService implements OnModuleInit {
  plaid: PlaidApi = new PlaidApi();

  async onModuleInit() {
    const config = new Configuration({
      basePath: PlaidEnvironments.sandbox,
      baseOptions: {
        headers: {
          "PLAID-CLIENT-ID": env.PLAID_CLIENT,
          "PLAID-SECRET": env.PLAID_SECRET,
        },
      },
    });

    this.plaid = new PlaidApi(config);
  }
}
