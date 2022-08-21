import { Controller, Post, Body } from '@nestjs/common';

import { CheckoutService } from '../services/checkout.service';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post('/')
  async checkout() {
    const result = await this.checkoutService.checkout();
    return result;
  }
}
