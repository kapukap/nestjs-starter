import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
    ) {
    }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        await this.usersRepository.createUser(authCredentialsDto)
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const {name, password} = authCredentialsDto
        const user = await this.usersRepository.findOneBy({name})

        if (user && (await bcrypt.compare(password, user.password))) {
            return 'success'
        } else {
            throw new UnauthorizedException('Please check your login credentials')
        }
    }
}
