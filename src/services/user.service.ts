import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../interfaces/user.interface';
import { Post } from '../interfaces/post.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Post') private readonly postModel: Model<Post>,
  ) {}

  async followUser(toFollowId: string, userId: string): Promise<any> {
    try {
      const userToFollow = await this.userModel.findOne({
        _id: toFollowId,
      });

      if (!userToFollow)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);

      const user = await this.userModel.findOne({ _id: userId });

      if (user.following.includes(userId))
        throw new HttpException(
          'User already followed',
          HttpStatus.BAD_REQUEST,
        );

      user.following.push(userId);

      await user.save();

      userToFollow.followers.push(userId);

      userToFollow.save();

      return {
        success: true,
        msg: 'User followed successfully',
      };
    } catch (err) {
      return err;
    }
  }

  async unfollowUser(toUnFollowId: string, userId: string): Promise<any> {
    try {
      const userToUnfollow = await this.userModel.findOne({
        _id: toUnFollowId,
      });

      if (!userToUnfollow)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);

      const user = await this.userModel.findOne({ _id: userId });

      const doesUserFollow: boolean = user.following.includes(toUnFollowId);

      if (doesUserFollow)
        throw new HttpException('User not followed', HttpStatus.BAD_REQUEST);
      const indexOfUserFollowing: number = user.following.findIndex(
        (id) => id === userId,
      );
      user.following.splice(indexOfUserFollowing, 1);

      await user.save();

      const indexToRemove = userToUnfollow.followers.findIndex(
        (id) => id === userId,
      );

      userToUnfollow.followers.splice(indexToRemove, 1);

      await userToUnfollow.save();

      return {
        success: true,
        msg: 'User unfollowed successfully',
      };
    } catch (err) {
      return err;
    }
  }
}
