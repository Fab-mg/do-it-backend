import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mongodb',
        url: configService.get<string>('DB_URL_STRING'),
        database: configService.get<string>('DB_NAME') || 'do-it-db',
        synchronize: true,
        entities: [__dirname + '/../**/*.entity.{ts,js}'],
      });

      try {
        await dataSource.initialize();
        console.log('Data Source has been initialized!');
        return dataSource;
      } catch (err) {
        console.error('Error during Data Source initialization:', err);
        throw err;
      }
    },
  },
];
