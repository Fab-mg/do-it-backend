import { HttpException, Inject, Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { compare, hash } from 'bcryptjs';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from '../auth/dto/login-user.dto';
import { SafeUser } from '../types/safe.user.type';

const SALT_ROUNDS = 10;

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: MongoRepository<User>,
  ) {}

  toSafeUser(user: User): SafeUser {
    const { password, ...safeUser } = user;
    return safeUser;
  }

  async signUp(createUserDto: CreateUserDto): Promise<SafeUser> {
    const email = createUserDto.email.trim().toLowerCase();
    const existingUser = await this.userRepository.findOneBy({ email });
    if (existingUser) {
      throw new HttpException('Email already in use', 409);
    }

    const hashedPassword = await hash(createUserDto.password, SALT_ROUNDS);
    const savedUser = await this.userRepository.save({
      firstName: createUserDto.firstName.trim(),
      lastName: createUserDto.lastName.trim(),
      email,
      password: hashedPassword,
    });

    const createdUser = await this.userRepository.findOneBy({
      _id: savedUser._id,
    });
    if (!createdUser) {
      throw new HttpException('Failed to create user', 500);
    }

    return this.toSafeUser(createdUser);
  }

  async findUserByEmailForLogin(email: String): Promise<User> {
    if (email.length <= 1) {
      return null;
    }
    return await this.userRepository.findOneBy({ email });
  }

  async findUserById(userId: String): Promise<SafeUser | null> {
    const user = await this.userRepository.findOneBy({ _id: userId });
    if (user) {
      return this.toSafeUser(user);
    } else {
      return null;
    }
  }
}
