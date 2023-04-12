import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    find(opts: Prisma.UserWhereUniqueInput): Promise<User | null>;
}
//# sourceMappingURL=user.service.d.ts.map