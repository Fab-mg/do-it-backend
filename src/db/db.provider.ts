import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const dbUrlString = configService.get<string>('DB_URL_STRING');
      const dbName = configService.get<string>('DB_NAME');

      if (!dbUrlString || !dbName) {
        throw new Error('DB_URL_STRING and DB_NAME must be set');
      }

      const dataSource = new DataSource({
        type: 'mongodb',
        url: dbUrlString,
        database: dbName,
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
