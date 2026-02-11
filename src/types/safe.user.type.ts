import { User } from '../user/entity/user.entity';

export type SafeUser = Omit<User, 'password'>;
