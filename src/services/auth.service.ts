import { Injectable, HttpException, HttpStatus, Body } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { Model } from 'mongoose';
import { User } from '../interfaces/user.interface';
import { SingUpDto } from 'src/validation/signUp.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly configService: ConfigService,
  ) {}
  async signup(
    @Body()
    signUpDto: SingUpDto,
  ): Promise<any> {
    try {
      const email = signUpDto.email;
      let password = signUpDto.password;
      const name = signUpDto.name;
      const user = await this.userModel.findOne({ email });

      if (user)
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);

      // Password Encryption
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;

        bcrypt.hash(password, salt, (error, hash) => {
          if (error) throw error;
          password = hash;
        });
      });
      const newUser = new this.userModel({
        name,
        email,
        password,
      });
      const userObj = await newUser.save();

      const token = await jwt.sign(
        { id: userObj.id, userType: 'user' },
        process.env.JWT_SECRET,
        { expiresIn: '24h' },
      );

      return {
        success: true,
        msg: 'Sign up Successful',
        userObj,
        token,
      };
    } catch (err) {
      return err;
    }
  }

  async login(email: string, password: string): Promise<any> {
    try {
      // check if the user exists
      const user = await this.userModel.findOne({ email });
      if (!user)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);

      // Comparing the password
      const isMatched = bcrypt.compare(password, user.password);
      if (isMatched) {
        const token = jwt.sign(
          { id: user.id, userType: 'user' },
          process.env.JWT_SECRET,
          { expiresIn: '7d' },
        );
        return { success: true, msg: 'login successful', user, token };
      }

      throw new HttpException('password incorrect', HttpStatus.BAD_REQUEST);
    } catch (err) {
      return err;
    }
  }
}
