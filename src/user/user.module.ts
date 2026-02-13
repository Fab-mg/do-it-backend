import { forwardRef, Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { UserController } from './user.controller';
import { userProviders } from './user.providers';
import { UserService } from './user.service';
import { TaskModule } from 'src/task/task.module';

@Module({
  imports: [DbModule, forwardRef(() => TaskModule)],
  controllers: [UserController],
  providers: [UserService, ...userProviders],
  exports: [UserService],
})
export class UserModule {}
