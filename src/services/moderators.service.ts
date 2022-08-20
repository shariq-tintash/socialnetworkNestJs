import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Model } from 'mongoose';

import { Moderator } from '../interfaces/moderator.interface';
import { Post } from '../interfaces/post.interface';

@Injectable()
export class ModeratorsService {
  PER_PAGE_ITEMS = 2;

  constructor(
    @InjectModel('Moderator') private readonly moderatorModel: Model<Moderator>,
    @InjectModel('Post') private readonly postModel: Model<Post>,
  ) {}

  async signup(): Promise<any> {
    return '';
  }

  async login(): Promise<any> {
    return '';
  }

  async getPosts(): Promise<any> {
    return '';
  }
}
