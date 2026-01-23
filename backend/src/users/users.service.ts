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
        return user; 
    }

    /**
     * Get a user by id
     * @param id The user's id
     * @returns The user with the id
     */
    async getById(id: string) {
        const user = await this.usersRepo.findById(id);
        return user; 
    }

    /**
     * Create a user, checking if email is unique and hashing password
     * @param data Email and password of the user
     * @returns The created user
     */
    async createUser(data: UserData) {
        const existingUser = await this.usersRepo.findByEmail(data.email);
        if(existingUser) {
            throw new ConflictException('User with email ' + data.email + ' already exists');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        return this.usersRepo.createUser({ email: data.email, password: hashedPassword });
    }

    /**
     * Create a user with an already hashed password.
     * @param data Email and password hashed
     * @returns The created user
     */
    async createUserWithHashedPassword(data: { email: string; passwordHashed: string }) {
        const existingUser = await this.usersRepo.findByEmail(data.email);
        if (existingUser) {
            throw new ConflictException('User with email ' + data.email + ' already exists');
        }
        return this.usersRepo.createUser({ email: data.email, password: data.passwordHashed });
    }

    /**
     * Update user password
     * @param email User email
     * @param newPassword New plain password
     */
    async updatePassword(email: string, newPassword: string) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        return this.usersRepo.updatePassword(email, hashedPassword);
    }

}
