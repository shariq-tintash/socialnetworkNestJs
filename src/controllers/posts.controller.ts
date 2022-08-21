import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Patch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PostsService } from '../services/posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('/create')
  async createPost() {
    const result = await this.postsService.createPost();
    return result;
  }

  @Patch('/update/:id')
  async updatePost() {
    const result = await this.postsService.updatePost();
    return result;
  }

  @Delete('/delete/:id')
  async deletePost() {
    const result = await this.postsService.deletePost();
    return result;
  }

  @Get('/all')
  async getAllPosts() {
    const result = await this.postsService.getAllPosts();
    return result;
  }

  @Get('/feed')
  async getFeed() {
    const result = await this.postsService.getFeed();
    return result;
  }
}
