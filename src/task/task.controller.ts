import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create.task.dto';
import UpdateTaskDto from './dto/update.task.dto';
import FindAllQueryDto from './dto/find.all.query.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.taskService.findById(id);
  }

  @Get()
  async findAllOrSearch(@Query() findAllQueryDto: FindAllQueryDto) {
    console.log(
      '🚀 ~ TaskController ~ findAll ~ findAllQueryDto:',
      findAllQueryDto,
    );
    return this.taskService.findAllOrSearch(findAllQueryDto);
  }

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    const task = await this.taskService.create(createTaskDto);
    if (!task) {
      throw new HttpException('Failed to create task', 500);
    }
    return task;
  }

  @Put(':id')
  async update(@Body() updateTaskDto: UpdateTaskDto, @Param('id') id: string) {
    const task = await this.taskService.update(id, updateTaskDto);
    return task;
  }
}
