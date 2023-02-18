import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    // @InjectRepository(User)
    private userRepository: UserRepository,
  ) {}

  async signUp(userData: CreateUserDto): Promise<void> {
    return this.userRepository.createUser(userData);
  }
}
