import { Address } from "../client";
import { Integer, Required, Property, Groups, Description, Allow, MinLength, MaxLength, CollectionOf } from "@tsed/schema";
import { CountryModel } from "./CountryModel";
import { UserModel } from "./UserModel";

export class AddressModel implements Address {
  @Property(Number)
  @Integer()
  @Required()
  @Groups("!creation")
  id: number;

  @Property(String)
  @Required()
  @Description("Primary street portion of the address.")
  streetAddress: string;

  @Property(String)
  @Allow(null)
  @Description("Extra street information, like an apartment or suite number.")
  streetAddress2: string | null;

  @Property(String)
  @Required()
  city: string;

  @Property(() => CountryModel)
  @Required()
  country: CountryModel;

  @Property(String)
  @Required()
  @Description("Postal code for associated address. Must be 5 digits for US addresses.")
  @MinLength(2)
  @MaxLength(10)
  postalCode: string;

  @CollectionOf(() => UserModel)
  @Required()
  user: UserModel[];

  @Property(Number)
  @Integer()
  @Required()
  countryId: number;
}

