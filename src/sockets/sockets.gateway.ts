import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Post } from '../interfaces/post.interface';

@WebSocketGateway()
export class SocketsGateway {
  @WebSocketServer()
  server;

  handleConnection(client: any) {
    console.log('new client connected');
  }
}
