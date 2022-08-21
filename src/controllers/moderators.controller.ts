import {
  Body,
  Controller,
  Get,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { SingUpDto } from 'src/validation/signUp.dto';

import { ModeratorsService } from '../services/moderators.service';

@Controller('moderators')
export class ModeratorsController {
  constructor(private readonly moderatorsService: ModeratorsService) {}

  @Post('/signup')
  async moderatorSignup(@Body() signUp: SingUpDto) {
    const result = await this.moderatorsService.signup(signUp);
    return result;
  }

  @Post('/login')
  async moderatorLogin(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const result = await this.moderatorsService.login(email, password);
    return result;
  }

  @Get('/posts')
  async getAllPosts() {
    const result = await this.moderatorsService.getPosts();
    console.log(result);
    return result;
  }
}
