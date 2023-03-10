import { IsString } from 'class-validator';

export class BookDto {
  @IsString()
  id: string;

  @IsString()
  user: string;

  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsString()
  description: string;

  @IsString()
  review: string;
}
