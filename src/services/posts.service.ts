import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Post } from '../interfaces/post.interface';
import { User } from '../interfaces/user.interface';
import { SocketsGateway } from 'src/sockets/sockets.gateway';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('Post') private readonly postModel: Model<Post>,
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly socketsGateway: SocketsGateway,
  ) {}

  async getAllPosts(): Promise<any> {
    return '';
  }

  async createPost(): Promise<any> {
    return '';
  }

  async getFeed(): Promise<any> {
    return '';
  }

  async updatePost(): Promise<any> {
    return '';
  }

  async deletePost(): Promise<any> {
    return '';
  }
}
