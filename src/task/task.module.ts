import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { taskProviders } from './task.providers';
import { DbModule } from '../db/db.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [DbModule, UserModule],
  controllers: [TaskController],
  providers: [TaskService, ...taskProviders],
})
export class TaskModule {}
