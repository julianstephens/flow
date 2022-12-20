import { isArray } from "@tsed/core";
import { deserialize } from "@tsed/json-mapper";
import { Injectable, Inject } from "@tsed/di";
import { PrismaService } from "../services/PrismaService";
import { Prisma, Country } from "../client";
import { CountryModel } from "../models";

@Injectable()
export class CountriesRepository {
  @Inject()
  protected prisma: PrismaService;

  get collection() {
    return this.prisma.country
  }

  get groupBy() {
    return this.collection.groupBy.bind(this.collection)
  }

  protected deserialize<T>(obj: null | Country | Country[]): T {
    return deserialize<T>(obj, { type: CountryModel, collectionType: isArray(obj) ? Array : undefined })
  }

  async findUnique(args: Prisma.CountryFindUniqueArgs): Promise<CountryModel | null> {
    const obj = await this.collection.findUnique(args);
    return this.deserialize<CountryModel | null>(obj);
  }

  async findFirst(args: Prisma.CountryFindFirstArgs): Promise<CountryModel | null> {
    const obj = await this.collection.findFirst(args);
    return this.deserialize<CountryModel | null>(obj);
  }

  async findMany(args?: Prisma.CountryFindManyArgs): Promise<CountryModel[]> {
    const obj = await this.collection.findMany(args);
    return this.deserialize<CountryModel[]>(obj);
  }

  async create(args: Prisma.CountryCreateArgs): Promise<CountryModel> {
    const obj = await this.collection.create(args);
    return this.deserialize<CountryModel>(obj);
  }

  async update(args: Prisma.CountryUpdateArgs): Promise<CountryModel> {
    const obj = await this.collection.update(args);
    return this.deserialize<CountryModel>(obj);
  }

  async upsert(args: Prisma.CountryUpsertArgs): Promise<CountryModel> {
    const obj = await this.collection.upsert(args);
    return this.deserialize<CountryModel>(obj);
  }

  async delete(args: Prisma.CountryDeleteArgs): Promise<CountryModel> {
    const obj = await this.collection.delete(args);
    return this.deserialize<CountryModel>(obj);
  }

  async deleteMany(args: Prisma.CountryDeleteManyArgs) {
    return this.collection.deleteMany(args)
  }

  async updateMany(args: Prisma.CountryUpdateManyArgs) {
    return this.collection.updateMany(args)
  }

  async aggregate(args: Prisma.CountryAggregateArgs) {
    return this.collection.aggregate(args)
  }
}
