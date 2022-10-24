import { User } from "../client";
import { Integer, Required, Property, Groups, Description, Email, Enum, Format } from "@tsed/schema";
import { Role } from "../enums";

export class UserModel implements User {
  @Property(Number)
  @Integer()
  @Required()
  @Groups("profile", "!creation")
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

  @Required()
  @Enum(Role)
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

