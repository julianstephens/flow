import { User } from "../client";
import { Integer, Required, Property, Min, Description, Email, Allow, Enum, CollectionOf, Format } from "@tsed/schema";
import { AddressModel } from "./AddressModel";
import { Role } from "../enums";

export class UserModel implements User {
  @Property(Number)
  @Integer()
  @Required()
  @Min(1)
  id: number;

  @Property(String)
  @Required()
  @Description("User full name. Must be their legal name.")
  fullName: string;

  @Property(String)
  @Required()
  @Description("User nickname.")
  shortName: string;

  @Property(String)
  @Required()
  @Email()
  @Description("User email. This email must be unique!")
  email: string;

  @Property(Number)
  @Integer()
  @Required()
  @Description("User date of birth. Format: Unix Timestamp")
  dob: number;

  @Property(() => AddressModel)
  @Allow(null)
  @Description("User address")
  address: AddressModel | null;

  @Property(Number)
  @Integer()
  @Allow(null)
  addressId: number | null;

  @Required()
  @Enum(Role)
  @CollectionOf(String)
  roles: Role[];

  @Property(Date)
  @Format("date-time")
  @Required()
  createdAt: Date;

  @Property(Date)
  @Format("date-time")
  @Required()
  updatedAt: Date;
}

