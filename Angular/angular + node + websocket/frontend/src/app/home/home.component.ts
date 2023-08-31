import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  getUser,
  removeUser,
  removeToken,
  removeRefreshToken,
} from '../utills/localstorage/user';
import { getroomchat, removeroomchat } from '../utills/localstorage/roomchat';
import axios from 'axios';
import { SocketService } from '../socket.service';
import { Router } from '@angular/router';

interface User {
  user_id: number;
  user_name: string;
  user_email: string;
  user_avatar: string | null;
}
interface Roomchat {
  room_created_by_user_id: number;
  room_id: number;
  room_name: string;
}
interface ParamGet {
  keyword: string;
  limit: number;
  pageNumber: number;
  room_id: number | null;
  user_id: number | null;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  [x: string]: any;
  user: User | null; // Khai báo biến user
  roomchat: Roomchat | null;
  allMessagesInRoom: any[] = [];
  messageContent: string = ''; // Biến lưu nội dung tin nhắn
  paramGet: ParamGet;

  constructor(private socketService: SocketService, private router: Router) {
    const userString: string | null = getUser();
    if (userString !== null) {
      this.user = JSON.parse(userString);
    } else {
      this.user = null;
    }
    const roomchatString: string | null = getroomchat();
    if (roomchatString !== null) {
      this.roomchat = JSON.parse(roomchatString);
    } else {
      this.roomchat = null;
    }

    this.paramGet = {
      keyword: '',
      limit: 20,
      pageNumber: 1,
      room_id: this.roomchat?.room_id ?? null,
      user_id: this.user?.user_id ?? null,
    };

    // Lắng nghe sự kiện 'message' từ máy chủ WebSocket
    this.socketService.listen('message').subscribe((message: string) => {
      this.getMessageInRoom();
      // this.allMessagesInRoom.push(message);
    });
  }

  // // cuộn xuống dưới cùng khi có dũ liệu mới
  @ViewChild('chatContainer')
  chatContainer!: ElementRef;
  private scrollChatToBottom() {
    const chatContainerElement = this.chatContainer.nativeElement;
    chatContainerElement.scrollTop = chatContainerElement.scrollHeight;
  }
  ngAfterViewChecked() {
    this.scrollChatToBottom();
  }

  // lấy dữ liệu
  async getMessageInRoom() {
    const params = this.paramGet;
    try {
      const response = await axios.get(
        'http://localhost:9288/api/v1/getMessageInRoom',
        {
          params: params,
        }
      );

      this.allMessagesInRoom = response.data.allMessagesInRoom;
    } catch (error) {}
  }

  // khởi tạo
  ngOnInit() {
    if (this.roomchat) {
      this.getMessageInRoom();
    }
  }

  // gửi tin nhắn lên
  async postMessageInRoom() {
    try {
      const messageData = {
        room_id: this.roomchat?.room_id,
        user_name: this.user?.user_name,
        user_id: this.user?.user_id,
        message_content: this.messageContent,
        message_sent_at: new Date().toISOString(),
      };
      const response = await axios.post(
        'http://localhost:9288/api/v1/postMessageInRoom',
        messageData
      );

      // Gửi tin nhắn đến máy chủ WebSocket
      this.socketService.emit('message', this.messageContent);
    } catch (error) {}
  }
  async sendMessage() {
    if (this.messageContent.trim() !== '') {
      await this.postMessageInRoom();
      this.messageContent = '';
    }
  }

  // // quay về màn chọn room của user
  backToSelectRoom() {
    this.router.navigate([`/selectroomchat/${this.user?.user_name}`]);
  }

  // // xóa 1 tin nhắn trong room
  async deleteMessageUserInRoom(message: any) {
    const params = message;
    try {
      await axios.delete(
        'http://localhost:9288/api/v1/deleteMessageUserInRoom',
        {
          params: params,
        }
      );
      this.getMessageInRoom();
      this.socketService.emit('message');
    } catch (error) {}
  }

  editMessageUserUserInRoom(message: any) {
    console.log('editMessageUser message', message);
  }

  // đăng xuất
  logoutToLogin() {
    removeUser();
    removeToken();
    removeRefreshToken();
    removeroomchat();
    this.router.navigate([`/`]);
  }
}
