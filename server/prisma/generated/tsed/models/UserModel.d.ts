import { User } from "../client";
import { Role } from "../enums";
export declare class UserModel implements User {
    id: number;
    fullName: string;
    shortName: string;
    email: string;
    passwordHash: string;
    roles: Role[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
