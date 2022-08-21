import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Post } from '../interfaces/post.interface';

@WebSocketGateway()
export class SocketsGateway {
  @WebSocketServer()
  server;

  handleCreate(post: Post, message: string) {
    this.server.emit('posts', message, post);
  }

  handleConnection(client: any) {
    console.log('new client connected');
  }
}
