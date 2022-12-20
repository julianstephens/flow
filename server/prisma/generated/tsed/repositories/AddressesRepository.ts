import { isArray } from "@tsed/core";
import { deserialize } from "@tsed/json-mapper";
import { Injectable, Inject } from "@tsed/di";
import { PrismaService } from "../services/PrismaService";
import { Prisma, Address } from "../client";
import { AddressModel } from "../models";

@Injectable()
export class AddressesRepository {
  @Inject()
  protected prisma: PrismaService;

  get collection() {
    return this.prisma.address
  }

  get groupBy() {
    return this.collection.groupBy.bind(this.collection)
  }

  protected deserialize<T>(obj: null | Address | Address[]): T {
    return deserialize<T>(obj, { type: AddressModel, collectionType: isArray(obj) ? Array : undefined })
  }

  async findUnique(args: Prisma.AddressFindUniqueArgs): Promise<AddressModel | null> {
    const obj = await this.collection.findUnique(args);
    return this.deserialize<AddressModel | null>(obj);
  }

  async findFirst(args: Prisma.AddressFindFirstArgs): Promise<AddressModel | null> {
    const obj = await this.collection.findFirst(args);
    return this.deserialize<AddressModel | null>(obj);
  }

  async findMany(args?: Prisma.AddressFindManyArgs): Promise<AddressModel[]> {
    const obj = await this.collection.findMany(args);
    return this.deserialize<AddressModel[]>(obj);
  }

  async create(args: Prisma.AddressCreateArgs): Promise<AddressModel> {
    const obj = await this.collection.create(args);
    return this.deserialize<AddressModel>(obj);
  }

  async update(args: Prisma.AddressUpdateArgs): Promise<AddressModel> {
    const obj = await this.collection.update(args);
    return this.deserialize<AddressModel>(obj);
  }

  async upsert(args: Prisma.AddressUpsertArgs): Promise<AddressModel> {
    const obj = await this.collection.upsert(args);
    return this.deserialize<AddressModel>(obj);
  }

  async delete(args: Prisma.AddressDeleteArgs): Promise<AddressModel> {
    const obj = await this.collection.delete(args);
    return this.deserialize<AddressModel>(obj);
  }

  async deleteMany(args: Prisma.AddressDeleteManyArgs) {
    return this.collection.deleteMany(args)
  }

  async updateMany(args: Prisma.AddressUpdateManyArgs) {
    return this.collection.updateMany(args)
  }

  async aggregate(args: Prisma.AddressAggregateArgs) {
    return this.collection.aggregate(args)
  }
}
