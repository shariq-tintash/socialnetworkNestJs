import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Post } from '../interfaces/post.interface';
import { User } from '../interfaces/user.interface';
import { SocketsGateway } from 'src/sockets/sockets.gateway';
import { PostDto } from 'src/validation/post.dto';
import { FeedDto } from 'src/validation/feed.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('Post') private readonly postModel: Model<Post>,
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly socketsGateway: SocketsGateway,
  ) {}

  async createPost(postDto: PostDto): Promise<any> {
    try {
      const newPost = new this.postModel({
        title: postDto.title,
        content: postDto.content,
        creator: postDto.id,
      });

      const savedPost = await newPost.save();

      const user = await this.userModel.findOne({ _id: postDto.id });
      user.posts.push(savedPost._id.toString());
      user.save();

      this.socketsGateway.handleCreate(savedPost, 'New Post Created');

      return { success: true, post: savedPost };
    } catch (err) {
      return err;
    }
  }

  async getFeed(feedDto: FeedDto): Promise<any> {
    const PER_PAGE_ITEMS = 2;
    const orderSort = {};
    orderSort[feedDto.param] = feedDto.order;

    const user = await this.userModel.findOne({ _id: feedDto.id });
    if (!user.isPaid)
      throw new HttpException(
        'Subcription needed to view feed. Go to /checkout',
        HttpStatus.UNAUTHORIZED,
      );

    const { following } = user;

    const postsCount: number = await this.postModel
      .find({ creator: { $in: following } })
      .count();

    if (feedDto.pageNumber * PER_PAGE_ITEMS >= postsCount + PER_PAGE_ITEMS)
      throw new HttpException(
        'Requested Page does not exist',
        HttpStatus.NOT_FOUND,
      );

    const posts = await this.postModel
      .find({ createdBy: { $in: following } })
      .sort(orderSort)
      .skip((feedDto.pageNumber - 1) * PER_PAGE_ITEMS)
      .limit(PER_PAGE_ITEMS);

    if (!posts) throw new HttpException('No Posts found', HttpStatus.NOT_FOUND);

    return {
      success: true,
      posts,
      totalPosts: postsCount,
      nextPage: Number(feedDto.pageNumber) + 1,
      hasNextPage: feedDto.pageNumber * PER_PAGE_ITEMS < postsCount,
      hasPrevPage: feedDto.pageNumber > 1,
    };
  }

  async updatePost(postDto: PostDto, postId: string): Promise<any> {
    try {
      const post = await this.postModel.findOne({ _id: postId });

      if (!post)
        throw new HttpException('No posts found', HttpStatus.NOT_FOUND);

      if (post.creator !== postDto.id)
        throw new HttpException('Unautharized', HttpStatus.UNAUTHORIZED);

      post.title = postDto.title;
      post.content = postDto.content;
      const updatedPost = await post.save();

      this.socketsGateway.handleCreate(updatedPost, 'Post Updated');

      return {
        success: true,
        msg: 'Post Updated successfully',
        updatedPost,
      };
    } catch (err) {
      return err;
    }
  }

  async deletePost(userId: string, postId: string): Promise<any> {
    try {
      const post = await this.postModel.findById({ _id: postId });
      if (!post)
        throw new HttpException('No posts found', HttpStatus.NOT_FOUND);

      if (post.creator !== userId)
        throw new HttpException('Unautharized', HttpStatus.UNAUTHORIZED);

      const deletedPost = await this.postModel.findByIdAndRemove(postId);

      const user = await this.userModel.findOne({ _id: userId });
      const indexOfPost: number = user.posts.findIndex((id) => id === postId);
      user.posts.splice(indexOfPost, 1);

      await user.save();

      this.socketsGateway.handleCreate(deletedPost, 'Post Deleted');

      return {
        success: true,
        msg: 'Post Deleted successfully',
      };
    } catch (err) {
      return err;
    }
  }
}
