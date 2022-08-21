import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users.module';
import { AuthModule } from './modules/auth.module';
import { PostsModule } from './modules/posts.module';
import { ModeratorsModule } from './modules/moderators.module';
import { AuthMiddleware } from './middleware/authenticate.middleware';
import { CheckoutModule } from './modules/checkout.module';
import { SocketsModule } from './sockets/sockets.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PostsModule,
    ModeratorsModule,
    CheckoutModule,
    SocketsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'process.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI'),
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        'users/follow/:id',
        'users/unfollow/:id',
        'posts/create',
        'posts/update/:id',
        'posts/delete/:id',
        'posts/all',
        'posts/feed',
        'moderators/posts',
        '/checkout',
      );
  }
}
