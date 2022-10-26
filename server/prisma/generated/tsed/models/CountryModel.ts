import { Country } from "../client";
import { Integer, Required, Property, Min, Groups, CollectionOf } from "@tsed/schema";
import { AddressModel } from "./AddressModel";

export class CountryModel implements Country {
  @Property(Number)
  @Integer()
  @Required()
  @Min(1)
  @Groups("!creation")
  id: number;

  @Property(String)
  @Required()
  abbrev: string;

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

