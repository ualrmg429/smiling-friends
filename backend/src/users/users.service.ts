import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UserData } from './users.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private usersRepo: UsersRepository) {}

    /**
     * Get a user by email
     * @param email The user's email
     * @returns The user with the email
     */
    async getByEmail(email: string) {
        const user = await this.usersRepo.findByEmail(email);

        if(user === null) {
            throw new NotFoundException('User whit email' + email + 'not found');
        }

        return user;
    }

    /**
     * Create a user, checking if email is unique and hashing password
     * @param data Email and password of the user
     * @returns The created user
     */
    async createUser(data: UserData) {
        const existingUser = this.usersRepo.findByEmail(data.email);
        if(existingUser !== null) {
            throw new ConflictException('User with email ' + data.email + ' already exists');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        return this.usersRepo.createUser({ email: data.email, password: hashedPassword });
    }
}
