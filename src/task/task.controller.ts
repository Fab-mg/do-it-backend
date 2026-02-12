import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create.task.dto';
import UpdateTaskDto from './dto/update.task.dto';
import FindAllQueryDto from './dto/find.all.query.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { FindByStatusDto } from './dto/find.by.status.dto';

@Controller('task')
@UseGuards(AuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get(':id')
  async findById(@Param('id') id: string, @Req() req: Request) {
    const userId = req['user'].sub;
    return this.taskService.findById(id, userId);
  }

  @Get()
  async findAllOrSearch(
    @Query() findAllQueryDto: FindAllQueryDto,
    @Req() req: Request,
  ) {
    const userId = req['user'].sub;
    return this.taskService.findAllOrSearch(findAllQueryDto, userId);
  }

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Req() req: Request) {
    const userId = req['user'].sub;
    console.log('🚀 ~ TaskController ~ create ~ userId:', userId);
    const task = await this.taskService.create(createTaskDto, userId);
    if (!task) {
      throw new HttpException('Failed to create task', 500);
    }
    return task;
  }

  @Post('status')
  async getByStatus(
    @Body() findByStatusDto: FindByStatusDto,
    @Req() req: Request,
  ) {
    const userId = req['user'].sub;
    let tasks = await this.taskService.findByStatus(findByStatusDto, userId);
    console.log(
      '🚀 ~ TaskController ~ getByStatus ~ tasks: ',
      findByStatusDto.status,
      ' ',
      tasks.length,
    );
    return tasks;
  }

  @Put(':id')
  async update(
    @Body() updateTaskDto: UpdateTaskDto,
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    console.log('🚀 ~ TaskController ~ update ~ update:', id);
    const userId = req['user'].sub;
    const task = await this.taskService.update(id, updateTaskDto, userId);
    return task;
  }
}
