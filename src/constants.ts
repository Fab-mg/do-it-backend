import { ConfigService } from '@nestjs/config';
const configService = new ConfigService();

export const appConstants = {
  jwtSecret: configService.get<string>('JWT_SECRET'),
  port: configService.get<string>('PORT') || 3050,
  dbUrlString: configService.get<string>('DB_URL_STRING'),
  dbName: configService.get<string>('DB_NAME'),
  // mailerHost: configService.get<string>('MAILER_HOST'),
  // mailerPort: configService.get<string>('MAILER_PORT'),
  // mailerSecure:
  //   configService.get<string>('MAILER_SECURE') == 'false' ? false : true,
  // mailerUser: configService.get<string>('MAILER_USER'),
  // mailerPassword: configService.get<string>('MAILER_PASSWORD'),
  // mailerSender: configService.get<string>('MAILER_SENDER'),
};
