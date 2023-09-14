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
  room_avatar:string
}
interface ParamGet {
  keyword: string;
  limit: number;
  pageNumber: number;
  room_id: number | null;
  user_id: number | null;
}
interface ParamsEdit {
  message_id: number;
  message_content: string;
}
interface MessageData {
  message_id: number;
  room_id: number;
  user_name: string;
  user_id: number;
  message_content: string;
  message_sent_at: string;
  user_avatar: string
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
  allMessagesInRoom: MessageData[] = [];
  messageContent: string = ''; // Biến lưu nội dung tin nhắn
  paramGet: ParamGet;
  totalMessage: number = 0;
  editMessageContentText: string = '';
  stateOpenEditMessage: number = -1;

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
    this.socketService.listen('message').subscribe((message: MessageData) => {
      // console.log('socket message', message);
      this.pustMessageInChatArray(message);
      // this.getMessageInRoom();
    });
    this.socketService.listen('edit').subscribe((message: ParamsEdit) => {
      // console.log('socket edit', message);
      this.editMessage(message);
    });
    this.socketService.listen('delete').subscribe((message: number) => {
      // console.log('socket delete', message);
      this.deleteMessage(message);
      // this.getMessageInRoom();
    });
  }

  // // thanh cuộn theo vị trí chỉ định
  @ViewChild('chatContainer')
  chatContainer!: ElementRef;
  private scrollChatToBottom() {
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

  // // gửi tin nhắn mới lên giao diện
  pustMessageInChatArray(messageData: MessageData) {
    this.allMessagesInRoom.unshift(messageData);
  }

  // gửi tin nhắn lên api
  async postMessageInRoom() {
    if (this.messageContent.trim() !== '') {
      try {
        const oneNewMessageData = {
          room_id: this.roomchat?.room_id,
          user_name: this.user?.user_name,
          user_id: this.user?.user_id,
          user_avatar: this.user?.user_avatar,
          message_content: this.messageContent,
          message_sent_at: new Date().toISOString(),
        };
        const response = await axios.post(
          'http://localhost:9288/api/v1/postMessageInRoom',
          oneNewMessageData
        );

        //  (người gửi) tự scroll xuống dưới cùng
        this.scrollChatToBottom();

        // Gửi tin nhắn đến máy chủ WebSocket
        this.socketService.emit('message', response.data.oneNewMessageData);
        this.messageContent = '';
      } catch (error) {}
    }
  }

  // // quay về màn chọn room của user
  backToSelectRoom() {
    this.router.navigate([`/selectroomchat/${this.user?.user_name}`]);
  }

  // delete ở giao diện
  deleteMessage(message_id: number) {
    this.allMessagesInRoom = this.allMessagesInRoom.filter(
      (item) => item.message_id != message_id
    );
  }

  // // xóa 1 tin nhắn trong room api
  async deleteMessageUserInRoomApi(message: any) {
    const params = message;
    try {
      await axios.delete(
        'http://localhost:9288/api/v1/deleteMessageUserInRoom',
        {
          params: params,
        }
      );
      this.socketService.emit('delete', params.message_id);
    } catch (error) {}
  }

  // mở hộp edit tin nhắn
  openEditMessage(message_id: number) {
    this.stateOpenEditMessage = message_id;
  }

  // edit ở api
  async editMessageUserInRoom(message: any) {
    if (message.message_content.trim()) {
      const params = message;
      try {
        await axios.put(
          'http://localhost:9288/api/v1/editMessageUserInRoom',
          params
        );
        this.socketService.emit('edit', params);
      } catch (error) {
        console.log('error', error);
      }
    }
    this.stateOpenEditMessage = -1;
  }
  onInputBlurEditText(message_content: string) {
    this.stateOpenEditMessage = -1;
  }

  // edit ở giao diện
  editMessage(paramsEdit: ParamsEdit) {
    if (paramsEdit.message_content.trim()) {
      const foundIndex = this.allMessagesInRoom.findIndex(
        (item) => item.message_id === paramsEdit?.message_id
      );
      this.allMessagesInRoom[foundIndex].message_content =
        paramsEdit.message_content;
    }
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
