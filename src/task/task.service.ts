import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Task } from './entity/task.entity';
import { CreateTaskDto } from './dto/create.task.dto';
import UpdateTaskDto from './dto/update.task.dto';
import FindAllQueryDto from './dto/find.all.query.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entity/user.entity';
import { SafeUser } from 'src/types/safe.user.type';
import { FindByStatusDto } from './dto/find.by.status.dto';
import { TaskStatus } from 'src/enum/tast.status.enum';

@Injectable()
export class TaskService {
  constructor(
    @Inject('TASK_REPOSITORY')
    private taskRepository: MongoRepository<Task>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async verifyUser(userId: string): Promise<SafeUser> {
    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new HttpException('User verification failed', 500);
    }
    return user;
  }

  async findAllOrSearch(
    findAllQueryDTO: FindAllQueryDto,
    userId: string,
  ): Promise<Task[]> {
    let page: number;
    let limit: number;
    if (findAllQueryDTO.page && parseInt(findAllQueryDTO.page) < 1) {
      page = 1;
    } else {
      page = parseInt(findAllQueryDTO.page);
    }
    if (findAllQueryDTO.limit && parseInt(findAllQueryDTO.limit) < 1) {
      limit = 1;
    } else {
      limit = parseInt(findAllQueryDTO.limit);
    }
    const skip = (page - 1) * limit;
    let user = await this.verifyUser(userId);

    const where = {
      author: user,
    };
    findAllQueryDTO.search
      ? (where['title'] = { $regex: findAllQueryDTO.search, $options: 'i' })
      : undefined;
    const [tasks] = await this.taskRepository.findAndCount({
      where,
      skip,
      take: limit,
      order: {
        createdAt: 'DESC',
      },
    });
    return tasks;
  }

  async findByStatus(
    findByStatusDto: FindByStatusDto,
    userId: string,
  ): Promise<Task[]> {
    let page: number;
    let limit: number;
    if (findByStatusDto.page && findByStatusDto.page < 1) {
      page = 1;
    } else {
      page = findByStatusDto.page;
    }
    if (findByStatusDto.pageSize && findByStatusDto.pageSize < 1) {
      limit = 1;
    } else {
      limit = findByStatusDto.pageSize;
    }
    const skip = (page - 1) * limit;
    let user = await this.verifyUser(userId);
    const where = { author: user, status: findByStatusDto.status };

    const [tasks] = await this.taskRepository.findAndCount({
      where,
      skip,
      take: limit,
      order: {
        createdAt: 'DESC',
      },
    });
    return tasks;
  }

  async findById(id: string, userId: string): Promise<Task> {
    await this.verifyUser(userId);
    return this.taskRepository.findOneBy({ _id: new ObjectId(id) });
  }

  async create(
    createTaskDto: CreateTaskDto,
    userId: string,
  ): Promise<Task | null> {
    const user = await this.verifyUser(userId);
    let taskCtt = {
      ...createTaskDto,
      ...(createTaskDto.expectedFinish && {
        expectedFinish: new Date(createTaskDto.expectedFinish),
      }),
      status: TaskStatus.ONGOING,
      author: user,
    };
    console.log('🚀 ~ TaskService ~ create ~ taskCtt:', taskCtt);
    const savedTask = await this.taskRepository.save(taskCtt);
    if (!savedTask) {
      throw new HttpException('Failed to save task', 500);
    }
    return this.findById(savedTask._id.toString(), userId);
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
    userId: string,
  ): Promise<Task> {
    await this.verifyUser(userId);
    await this.taskRepository.update(id, updateTaskDto);
    if (updateTaskDto.status == TaskStatus.FINISHED) {
      await this.taskRepository.update(id, { finishedAt: new Date() });
    }
    return this.taskRepository.findOneBy({ _id: new ObjectId(id) });
  }

  async delete(id: string): Promise<void> {
    await this.taskRepository.update(id, { deletedAt: new Date() });
  }

  async restore(id: string): Promise<void> {
    await this.taskRepository.update(id, { deletedAt: null });
  }

  async hardDelete(id: string): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
