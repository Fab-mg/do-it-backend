import { DataSource } from 'typeorm';
import { User } from './entity/user.entity';

export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getMongoRepository(User),
    inject: ['DATA_SOURCE'],
  },
];
