import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class FeedDto {
  @IsString()
  @IsNotEmpty()
  public param: string;

  @IsNumber()
  public pageNumber: number;

  @IsNumber()
  public order: number;

  @IsNotEmpty()
  @IsString()
  public id: string;
}
