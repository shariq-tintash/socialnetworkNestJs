import {
  Body,
  Controller,
  Get,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { ModeratorsService } from '../services/moderators.service';

@Controller('moderators')
export class ModeratorsController {
  constructor(private readonly moderatorsService: ModeratorsService) {}

  @Post('/signup')
  async moderatorSignup() {
    const result = await this.moderatorsService.signup();
    return result;
  }

  @Post('/login')
  async moderatorLogin() {
    const result = await this.moderatorsService.login();
    return result;
  }

  @Get('/posts')
  async getAllPosts() {
    const result = await this.moderatorsService.getPosts();
    console.log(result);
    return result;
  }
}
