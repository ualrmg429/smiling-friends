import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserData } from './users.interface';
import { User } from 'generated/prisma';

@Injectable()
export class UsersRepository {
    constructor(private prisma : PrismaService) {}

    /**
     * Find a user in bd by email
     * @param email The user email
     */
    findByEmail(email: string) : Promise<User | null> {
       return this.prisma.user.findUnique({ where: { email } });
    }

    /**
     * Create a user
     * @param data The information to make an user
     */
    async createUser(data: UserData) {
        return this.prisma.user.create({ data: { email: data.email, passwordHashed: data.password } })
    }
}
