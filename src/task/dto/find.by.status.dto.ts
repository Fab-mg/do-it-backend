import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { TaskStatus } from 'src/enum/tast.status.enum';

export class FindByStatusDto {
  @IsEnum(TaskStatus)
  @IsNotEmpty()
  status: TaskStatus;

  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  pageSize?: number;
}
