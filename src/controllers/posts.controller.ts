import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Patch,
} from '@nestjs/common';
import { FeedDto } from 'src/validation/feed.dto';
import { PostDto } from 'src/validation/post.dto';
import { PostsService } from '../services/posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('/create')
  async createPost(@Body() postDto: PostDto) {
    const result = await this.postsService.createPost(postDto);
    return result;
  }

  @Patch('/update/:id')
  async updatePost(@Body() postDto: PostDto, @Param('id') postId: string) {
    const result = await this.postsService.updatePost(postDto, postId);
    return result;
  }

  @Delete('/delete/:id')
  async deletePost(@Body('id') userId: string, @Param('id') postId: string) {
    const result = await this.postsService.deletePost(userId, postId);
    return result;
  }

  @Get('/feed')
  async getFeed(@Body() feedDto: FeedDto) {
    const result = await this.postsService.getFeed(feedDto);
    return result;
  }
}
