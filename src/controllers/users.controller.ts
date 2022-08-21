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

import { UsersService } from '../services/user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch('/follow-user/:id')
  async followUser() {
    const result = await this.usersService.followUser();
    return result;
  }

  @Patch('/unfollow-user/:id')
  async unfollowUser() {
    const result = await this.usersService.unfollowUser();
    return result;
  }
}
