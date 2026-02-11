import { ConfigService } from '@nestjs/config';
const configService = new ConfigService();

export const appConstants = {
  jwtSecret: configService.get<string>('JWT_SECRET'),
  port: configService.get<string>('PORT') || 3050,
  dbUrlString: configService.get<string>('DB_URL_STRING'),
  dbName: configService.get<string>('DB_NAME'),
};
