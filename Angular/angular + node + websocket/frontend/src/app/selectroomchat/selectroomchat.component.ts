import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { setroomchat } from '../utills/localstorage/roomchat';
import {
  getUser,
  removeUser,
  removeToken,
  removeRefreshToken,
} from '../utills/localstorage/user';
import { removeroomchat } from '../utills/localstorage/roomchat';

interface Room {
  room_id: number;
  room_name: string;
  room_password: string;
  room_created_by_user_id: number;
}
interface User {
  user_id: number;
  user_name: string;
  user_email: string;
  user_avatar: string | null;
}
interface ParamGet {
  keyword: string;
  limit: number;
  pageNumber: number;
}

@Component({
  selector: 'app-selectroomchat',
  templateUrl: './selectroomchat.component.html',
  styleUrls: ['./selectroomchat.component.scss'],
})
export class SelectroomchatComponent implements OnInit {
  rooms: Room[] = [];
  selectedRoom: any = {};
  paramGet: ParamGet;
  user: User | null; // Khai báo biến user
  public message_error = '';
  public selectCreateroomchat: string = 'select';
  public room_search: string = '';
  public totalRoom: number = 0;
  public createRoom = {
    room_name: '',
    room_private: false,
    room_password: '',
    room_avatar:''
  };

  constructor(private router: Router) {
    const userString: string | null = getUser();
    if (userString !== null) {
      this.user = JSON.parse(userString);
    } else {
      this.user = null;
    }
    this.paramGet = {
      keyword: '',
      limit: 20,
      pageNumber: 1,
    };
  }
  // // layzyload
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const element = event.target as HTMLElement;
    if (this.paramGet.pageNumber * this.paramGet.limit > this.totalRoom) {
      return;
    }
    if ((element.scrollTop = element.scrollHeight - element.clientHeight)) {
      this.paramGet.pageNumber++;
      this.getAllRoomChat();
    }
  }

  ngOnInit() {
    this.getAllRoomChat();
  }

  async getAllRoomChat() {
    try {
      const response = await axios.get(
        'http://localhost:9288/api/v1/getAllRoomChat',
        { params: this.paramGet }
      );
      this.totalRoom = response.data.totalItems;
      if (this.paramGet.keyword) {
        this.rooms = [];
      }

      const items = [...this.rooms, ...response.data.rooms];
      const seenRoomIds = new Set();

      // Lọc và chỉ giữ lại các đối tượng không trùng lặp, duyệt qua từng item
      this.rooms = items.filter((item) => {
        if (seenRoomIds.has(item.room_id)) {
          return false; // Đã thấy "room_id" này trước đó, loại bỏ
        }
        seenRoomIds.add(item.room_id); // Thêm "room_id" vào danh sách đã thấy
        return true; // Giữ lại đối tượng này
      });

      // sắp xếp theo thứ tự a-z
      this.rooms.sort((a, b) => {
        const roomNameA = a.room_name.toLowerCase();
        const roomNameB = b.room_name.toLowerCase();
        if (roomNameA < roomNameB) {
          return -1;
        }
        if (roomNameA > roomNameB) {
          return 1;
        }
        return 0;
      });
    } catch (error) {}
  }

  joinRoom(room: Room) {
    this.selectedRoom = room;
  }

  async onFileSelectedRoomAvatar(event: any) {
    const file = event.target.files[0]; // Lấy tệp ảnh được chọn
    const formDataRoom = new FormData();
    formDataRoom.append('avatarRoom', file); // 'avatar' là tên trường chứa tệp ảnh trên máy chủ

    // Gửi tệp ảnh lên máy chủ
    try {
      const responseAvatarImage = await axios.post(
        'http://localhost:9288/api/v1/uploadAvatarRoom',
        formDataRoom
      );

      this.createRoom.room_avatar =
        'http://localhost:9288/uploads/' + responseAvatarImage.data.imagePath;
    } catch (error) {
      console.error('Lỗi khi tải lên ảnh:', error);
    }
  }

  async joinToRoom() {
    const param = {
      room_created_by_user_id: this.user?.user_id,
      room_password: this.createRoom.room_password,
      room_name_create: this.createRoom.room_name,
      room_name_select: this.selectedRoom.room_name,
      room_avatar: this.createRoom.room_avatar
    };
    if (this.selectCreateroomchat === 'select') {
      if (this.user?.user_name && this.selectedRoom.room_name) {
        try {
          const response = await axios.post(
            'http://localhost:9288/api/v1/createOrSelectRoomChat',
            param
          );
          const { roomInfo } = response.data;
          if (roomInfo) {
            setroomchat(response.data.roomInfo);
            this.router.navigate([
              `${this.user?.user_name}/room/${roomInfo.room_name}`,
            ]);
          }
        } catch (error) {
          const errorResponse = error as {
            response: { data: { message: string } };
          };
          this.message_error = errorResponse.response.data.message;
        }
      }
    }
    if (this.selectCreateroomchat === 'create') {
      try {
        const response = await axios.post(
          'http://localhost:9288/api/v1/createOrSelectRoomChat',
          param
        );
        const { roomInfo } = response.data;
        if (roomInfo) {
          setroomchat(response.data.roomInfo);
          this.router.navigate([
            `${this.user?.user_name}/room/${roomInfo.room_name}`,
          ]);
        }
      } catch (error) {
        const errorResponse = error as {
          response: { data: { message: string } };
        };
        this.message_error = errorResponse.response.data.message;
      }
    }
  }

  backToLogin() {
    removeUser();
    removeToken();
    removeRefreshToken();
    removeroomchat();
    this.router.navigate(['/']);
  }

  public selectOrCreateRoom(selectroomchat: string) {
    this.selectCreateroomchat = selectroomchat;
  }

  selectPrivateRoom() {
    this.createRoom.room_private = !this.createRoom.room_private;
  }

  async searchRoomInSelectRoomChat() {
    await this.getAllRoomChat();
  }

  // deleroom o giao dien
  deleteRoom(room: Room) {
    this.rooms = this.rooms.filter((item) => item.room_id != room.room_id);
  }

  // delete room API
  async deleteRoomAip(room: Room) {
    const params = room;
    try {
      await axios.delete('http://localhost:9288/api/v1/deleteRoomAip', {
        params,
      });
      this.deleteRoom(room);
    } catch (error) {}
  }
}
