import { Controller, Post, Param, Body } from '@nestjs/common';

import { UsersService } from '../services/user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/follow/:id')
  async followUser(
    @Param('id') idToFollow: string,
    @Body('id') userId: string,
  ) {
    const result = await this.usersService.followUser(idToFollow, userId);
    return result;
  }

  @Post('/unfollow/:id')
  async unfollowUser(
    @Param('id') idToUnFollow: string,
    @Body('id') userId: string,
  ) {
    const result = await this.usersService.unfollowUser(idToUnFollow, userId);
    return result;
  }
}
