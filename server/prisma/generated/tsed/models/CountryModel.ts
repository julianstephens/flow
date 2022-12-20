import { Country } from "../client";
import { Integer, Required, Property, Groups, CollectionOf } from "@tsed/schema";
import { AddressModel } from "./AddressModel";

export class CountryModel implements Country {
  @Property(Number)
  @Integer()
  @Required()
  @Groups("!creation")
  id: number;

  @Property(String)
  @Required()
  code: string;

  @Property(String)
  @Required()
  name: string;

  @CollectionOf(String)
  @Required()
  callingCodes: string[];

  @CollectionOf(() => AddressModel)
  @Required()
  Address: AddressModel[];
}

