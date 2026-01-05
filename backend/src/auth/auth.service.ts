import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserData } from 'src/users/users.interface';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async register(data: UserData) {
        const user = await this.usersService.createUser(data);
        return {
            id: user.id,
            email: user.email,
            role: user.role,
            token: await this.jwtService.signAsync({ 
                sub: user.id, 
                email: user.email, 
                role: user.role })
        };
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

        return {
            user,
            token: await this.jwtService.signAsync({ 
                sub: user.id, 
                email: user.email, 
                role: user.role })
        };
    }
}
