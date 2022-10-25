import { CountriesRepository, CountryModel } from "@generated/tsed";
import { StatusCodes } from "@interfaces/common.interfaces";
import { Prisma } from "@prisma/client";
import { Controller } from "@tsed/di";
import { NotFound } from "@tsed/exceptions";
import { QueryParams } from "@tsed/platform-params";
import { Description, Get, Name, Returns, Summary } from "@tsed/schema";
import * as _ from "lodash";

@Controller("/countries")
@Name("Countries")
export class CountriesCtrl {
  constructor(private readonly repo: CountriesRepository) {}

  @Get()
  @Summary("Retrieve a list of all countries")
  @Returns(StatusCodes.OK, Array).Of(CountryModel).Description("A list of countries")
  async get(
    @QueryParams("abbrev") @Description("Select country names") abbrev?: boolean,
    @QueryParams("names") @Description("Select country names") names?: boolean,
    @QueryParams("codes") @Description("Select IDD calling codes") codes?: boolean,
  ): Promise<CountryModel[]> {
    const args: Prisma.CountryFindManyArgs = {};

    if (abbrev) {
      args.select = { ...args.select, abbrev: true };
    }
    if (names) {
      args.select = { ...args.select, name: true };
    }
    if (codes) {
      args.select = { ...args.select, callingCodes: true };
    }

    let countries;
    if (_.isEmpty(args)) {
      countries = await this.repo.findMany();
    } else {
      countries = await this.repo.findMany(args);
    }

    if (!countries) throw new NotFound("No countries found.");

    return countries;
  }
}
