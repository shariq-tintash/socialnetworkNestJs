import {
  Controller,
  Delete,
  Patch,
  Post,
  Body,
  Param,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { AuthService } from '../services/auth.service';

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async userSignUp() {
    const result = await this.authService.signup();
    return result;
  }

  @Post('/login')
  async userLogin() {
    const result = await this.authService.login();
    return result;
  }
}
