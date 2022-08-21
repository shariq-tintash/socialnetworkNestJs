import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Model } from 'mongoose';
import { SingUpDto } from 'src/validation/signUp.dto';

import { Moderator } from '../interfaces/moderator.interface';
import { Post } from '../interfaces/post.interface';

@Injectable()
export class ModeratorsService {
  PER_PAGE_ITEMS = 2;

  constructor(
    @InjectModel('Moderator') private readonly moderatorModel: Model<Moderator>,
    @InjectModel('Post') private readonly postModel: Model<Post>,
  ) {}

  async signup(signUpDto: SingUpDto): Promise<any> {
    try {
      const email = signUpDto.email;
      let password = signUpDto.password;
      const name = signUpDto.name;
      const mod = await this.moderatorModel.findOne({ email });

      if (mod)
        throw new HttpException(
          'Moderator already exists',
          HttpStatus.BAD_REQUEST,
        );

      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(password, salt, (error, hash) => {
          if (error) throw error;

          password = hash;
        });
      });

      const newMod = new this.moderatorModel({
        name,
        email,
        password,
      });

      const modObj = await newMod.save();

      const token = jwt.sign(
        { id: modObj.id, userType: 'moderator' },
        process.env.JWT_SECRET,
        { expiresIn: '24h' },
      );

      return {
        success: true,
        msg: 'sign up successful',
        modObj,
        token,
      };
    } catch (err) {
      return err;
    }
  }

  async login(email: string, password: string): Promise<any> {
    try {
      // check if the moderator exists
      const mod = await this.moderatorModel.findOne({ email });
      if (!mod)
        throw new HttpException('Moderator not found', HttpStatus.NOT_FOUND);

      // Comparing the password
      const isMatched = bcrypt.compare(password, mod.password);

      if (isMatched) {
        const token = jwt.sign(
          { id: mod.id, userType: 'moderator' },
          process.env.JWT_SECRET,
          { expiresIn: '24h' },
        );

        return { success: true, msg: 'Login successful', mod, token };
      }

      throw new HttpException('Password incorrect', HttpStatus.BAD_REQUEST);
    } catch (err) {
      return err;
    }
  }

  async getPosts(): Promise<any> {
    try {
      const postsCount = await this.postModel.find().count();

      const currentPage = 1;
      const perPage = 4; //per page 4 posts only

      const posts = await this.postModel
        .find()
        .select('-creator')
        .sort({ createdAt: -1 })
        .skip((currentPage - 1) * perPage)
        .limit(perPage);

      if (!posts)
        throw new HttpException('No posts found', HttpStatus.NOT_FOUND);

      return {
        success: true,
        posts,
        totalPosts: postsCount,
      };
    } catch (err) {
      return err;
    }
  }
}
