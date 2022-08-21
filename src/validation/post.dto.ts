import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class PostDto {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsNotEmpty()
  @IsString()
  public content: string;

  @IsNotEmpty()
  @IsString()
  public id: string;
}
