import { HttpException, Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from 'src/types/login.response';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<LoginResponse> {
    const email = loginUserDto.email.trim().toLowerCase();
    const user = await this.userService.findUserByEmailForLogin(email);
    if (!user) {
      throw new HttpException('Invalid credentials', 401);
    }
    const passwordValid = await compare(loginUserDto.password, user.password);
    if (!passwordValid) {
      throw new HttpException('Invalid credentials', 401);
    }
    const payload = { sub: user._id, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
