import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { appConstants } from 'src/constants';

const configService = new ConfigService();

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mongodb',
        url: appConstants.dbUrlString,
        database: appConstants.dbName,
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
