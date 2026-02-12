import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const jwtSecret = configService.get<string>('JWT_SECRET');
        if (!jwtSecret) {
          throw new Error('JWT_SECRET is not set');
        }

        return {
          global: true,
          secret: jwtSecret,
          signOptions: { expiresIn: '1d' },
        };
      },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [JwtModule],
})
export class AuthModule {}
