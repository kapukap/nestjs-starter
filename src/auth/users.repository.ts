import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ErrorCodes } from '../Utils/Errors/errors-constaints.enum';

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

        const salt = await bcrypt.genSalt();
        const hashPass = await bcrypt.hash(password, salt);
        const user = this.create({ name, password: hashPass });

        try {
            await this.save(user);
        } catch (e) {
            if (e.code === ErrorCodes.UNIQUE_ERROR_CODE) {
                throw new ConflictException('Username already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}
