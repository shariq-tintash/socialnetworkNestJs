import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { Model } from 'mongoose';
import { User } from '../interfaces/user.interface';
import { Post } from '../interfaces/post.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Post') private readonly postModel: Model<Post>,
  ) {}

  async followUser(): Promise<any> {
    return '';
  }

  async unfollowUser(): Promise<any> {
    return '';
  }
}
