import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { Model } from 'mongoose';
import { User } from '../interfaces/user.interface';
import { Post } from '../interfaces/post.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Post') private readonly postModel: Model<Post>,
    private readonly configService: ConfigService,
  ) {}
  async signup(): Promise<any> {
    return '';
  }

  async login(): Promise<any> {
    return '';
  }
}
