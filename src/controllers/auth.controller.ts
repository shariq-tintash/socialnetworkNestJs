import {
  Controller,
  Delete,
  Patch,
  Post,
  Body,
  Param,
  Get,
  HttpStatus,
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SingUpDto } from 'src/validation/signUp.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async userSignUp(
    @Body()
    signUpDto: SingUpDto,
  ) {
    const result = await this.authService.signup(signUpDto);
    console.log(result);
    return result;
  }

  @Post('/login')
  async userLogin(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const result = await this.authService.login(email, password);
    return result;
  }
}
