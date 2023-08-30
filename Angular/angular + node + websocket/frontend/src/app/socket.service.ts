import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:9288', { transports: ['websocket'] });
  }

  // Lắng nghe sự kiện từ server
  public listen(event: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(event, (data: any) => {
        subscriber.next(data);
      });
    });
  }

  // Gửi sự kiện tới server
  public emit(event: string, data?: any) {
    this.socket.emit(event, data);
  }
}
