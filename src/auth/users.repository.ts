import { Repository } from 'typeorm';
import { User } from './user.entity';
import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class UsersRepository extends Repository<User> {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {
        super(userRepository.target, userRepository.manager);
    }

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { name, password } = authCredentialsDto;

        const user = this.create({ name, password });
        try {
            await this.save(user);
        } catch (e) {
            // duplicete user
            if (e.code === '23505') {
                throw new ConflictException('Username already exists')
            } else {
                throw new InternalServerErrorException()
            }
        }
    }
}
