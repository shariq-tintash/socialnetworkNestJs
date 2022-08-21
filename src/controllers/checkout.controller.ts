import { Controller, Post, Body } from '@nestjs/common';

import { CheckoutService } from '../services/checkout.service';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post('/')
  async checkout(@Body('id') user: string) {
    const result = await this.checkoutService.checkout(user);
    return result;
  }
}
