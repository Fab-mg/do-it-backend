import { Inject, Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Task } from './entity/task.entity';
import { CreateTaskDto } from './dto/create.task.dto';
import UpdateTaskDto from './dto/update.task.dto';
import FindAllQueryDto from './dto/find.all.query.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TaskService {
  constructor(
    @Inject('TASK_REPOSITORY')
    private taskRepository: MongoRepository<Task>,
    private readonly userService: UserService,
  ) {}

  async findAllOrSearch(findAllQueryDTO: FindAllQueryDto): Promise<Task[]> {
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

    const where = findAllQueryDTO.search
      ? { title: { $regex: findAllQueryDTO.search, $options: 'i' } }
      : undefined;

    const [tasks] = await this.taskRepository.findAndCount({
      where,
      skip,
      take: limit,
    });

    return tasks;
  }

  async findById(id: string): Promise<Task> {
    return this.taskRepository.findOneBy({ _id: new ObjectId(id) });
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task | null> {
    const savedTask = await this.taskRepository.save(createTaskDto);
    if (!savedTask) {
      console.error('Failed to save task:', createTaskDto);
      return null;
    }
    return this.findById(savedTask._id.toString());
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    await this.taskRepository.update(id, updateTaskDto);
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
