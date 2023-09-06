import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
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
  totalMessage: number = 0;

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
      console.log('message constructor', message);
      
      this.getMessageInRoom();
    });
  }

  // // thanh cuộn theo vị trí chỉ định
  @ViewChild('chatContainer')
  chatContainer!: ElementRef;
  private scrollChatToBottom() {
    console.log('deo cjo keo');
    const chatContainerElement = this.chatContainer.nativeElement;
    chatContainerElement.scrollTop = 0;
  }

  // // layzyload
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const element = event.target as HTMLElement;
    if (this.paramGet.pageNumber * this.paramGet.limit > this.totalMessage) {
      return;
    }
    if (element.scrollTop <= element.clientHeight - element.scrollHeight + 1) {
      this.paramGet.pageNumber++;
      this.getMessageInRoom();
    }
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

      this.totalMessage = response.data.totalItems;
      const messageDataAll = [...this.allMessagesInRoom, ...response.data.data];

      // lọc trùng sau khi concat
      const idMap = new Map();
      messageDataAll.forEach((item) => {
        if (
          !idMap.has(item.message_id) ||
          item.message_sent_at > idMap.get(item.message_id).message_sent_at
        ) {
          idMap.set(item.message_id, item);
        }
      });
      // xắp xếp theo message_sent_at
      this.allMessagesInRoom = Array.from(idMap.values()).sort((a, b) => {
        const timeA = a.message_sent_at;
        const timeB = b.message_sent_at;
        return timeB.localeCompare(timeA);
      });
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
      this.scrollChatToBottom();
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
      this.socketService.emit('message',params.message_id );
      console.log('params', params);
      this.allMessagesInRoom = this.allMessagesInRoom.filter(
        (item) => item.message_id != params.message_id
      );
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
