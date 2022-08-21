import {
  ForbiddenException,
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.get('Authorization');

    if (!token)
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Unauthorized. Please Login',
        },
        HttpStatus.UNAUTHORIZED,
      );
    const splitToken = token.split(' ')[1];
    try {
      const verified = jwt.verify(splitToken, process.env.JWT_SECRET);
      const url = req.originalUrl.split('/')[1];
      const { userType } = verified;
      if (url == 'moderators' && userType == 'user')
        throw new ForbiddenException();
      const decoded = jwt.decode(splitToken);
      req.body = { ...req.body, id: decoded.id };
    } catch (err) {
      throw new ForbiddenException();
    }
    return next();
  }
}
