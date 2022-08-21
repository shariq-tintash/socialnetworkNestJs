import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import Stripe from 'stripe';
import { Model } from 'mongoose';
import { User } from '../interfaces/user.interface';

@Injectable()
export class CheckoutService {
  private stripe;
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {
    this.stripe = new Stripe(process.env.Secret_Key, {
      apiVersion: '2022-08-01',
    });
  }

  async checkout(userId: string): Promise<any> {
    try {
      const paymentMethod = await this.stripe.paymentMethods.create({
        type: 'card',
        card: {
          number: '4242424242424242',
          exp_month: 8,
          exp_year: 2023,
          cvc: '314',
        },
      });

      const user = await this.userModel.findOne({ _id: userId });
      await this.stripe.customers.create({
        email: user.email,
        id: userId,
        payment_method: paymentMethod.id,
      });

      const charge = await this.stripe.charges.create({
        amount: '50',
        description: 'Feed payment',
        currency: 'usd',
        source: 'tok_visa',
      });

      await this.userModel.findOneAndUpdate(
        { _id: userId },
        { $set: { isPaid: true } },
      );
      return {
        success: true,
        message: 'Payment successful',
        charge,
      };
    } catch (err) {
      return err;
    }
  }
}
