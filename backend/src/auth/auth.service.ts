import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserData } from 'src/users/users.interface';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async register(data: UserData) {
        return this.usersService.createUser(data);
    }

    async login(data: UserData) {
        const user = await this.usersService.getByEmail(data.email);
        if (!user) {
            throw new UnauthorizedException();
        }

        // Compares password with bcrypt
        const isValid = await bcrypt.compare(data.password, user.passwordHashed); 
        if (!isValid) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
