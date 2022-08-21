import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class SingUpDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  password: string;
}
