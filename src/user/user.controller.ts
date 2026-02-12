import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.userService.signUp(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  @HttpCode(200)
  async getMe(@Req() req: Request) {
    let user = req['user'];
    user = await this.userService.findUserById(user.sub);
    if (!user) {
      throw new HttpException('user not found', 404);
    } else {
      return user;
    }
  }

  @Get(':userId')
  @HttpCode(200)
  async getUserById(@Param(':userId') userId: string) {
    return this.userService.findUserById(userId);
  }
}
