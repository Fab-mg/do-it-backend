import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export default class FindAllQueryDto {
  page?: string;
  limit?: string;
  search?: string;
}
