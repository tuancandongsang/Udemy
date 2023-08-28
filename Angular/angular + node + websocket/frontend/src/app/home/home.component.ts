import { Component } from '@angular/core';
import { getUser } from '../utills/localstorage/user';
import { getroomchat } from '../utills/localstorage/roomchat';
import axios from 'axios';
import moment from 'moment';

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
export class HomeComponent {
  user: User | null; // Khai báo biến user
  roomchat: Roomchat | null;
  allMessagesInRoom: any[] = [];
  messageContent: string = ''; // Biến lưu nội dung tin nhắn
  paramGet: {
    keyword: string;
    limit: number;
    pageNumber: number;
    room_id: number | null;
    user_id: number | null;
  };

  constructor() {
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
      limit: 10,
      pageNumber: 1,
      room_id: this.roomchat?.room_id ?? null,
      user_id: this.user?.user_id ?? null,
    };
  }

  // lấy dữ liệu
  async getMessageInRoom() {
    console.log('this.roomchat?.room_id', this.roomchat?.room_id);

    try {
      const response = await axios.get(
        'http://localhost:8080/api/v1/getMessageInRoom',
        {
          params: { room_id: this.roomchat?.room_id },
        }
      );
      this.allMessagesInRoom = response.data.allMessagesInRoom;
      console.log('response', response.data.allMessagesInRoom);
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
        'http://localhost:8080/api/v1/postMessageInRoom',
        messageData
      );
      console.log('response', response);
    } catch (error) {}
  }
  sendMessage() {
    console.log('tuancan', this.messageContent);
    if (this.messageContent.trim() !== '') {
      this.postMessageInRoom();
    }
  }
}
