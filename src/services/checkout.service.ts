import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import Stripe from 'stripe';
import { Model } from 'mongoose';
import { User } from '../interfaces/user.interface';

@Injectable()
export class CheckoutService {
  private stripe;
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {
    this.stripe = new Stripe(process.env.STRIPE_API, {
      apiVersion: '2022-08-01',
    });
  }

  async checkout(): Promise<any> {
    return '';
  }
}
