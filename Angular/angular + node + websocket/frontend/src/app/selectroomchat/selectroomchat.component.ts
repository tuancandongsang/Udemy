import { Component, OnInit } from '@angular/core';
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
}
interface User {
  user_id: number;
  user_name: string;
  user_email: string;
  user_avatar: string | null;
}

@Component({
  selector: 'app-selectroomchat',
  templateUrl: './selectroomchat.component.html',
  styleUrls: ['./selectroomchat.component.scss'],
})
export class SelectroomchatComponent implements OnInit {
  rooms: Room[] = [];
  selectedRoom: any = {};
  user: User | null; // Khai báo biến user
  public message_error = '';
  public selectCreateroomchat: string = 'select';
  public createRoom = {
    room_name: '',
    room_private: false,
    room_password: '',
  };
  constructor(private router: Router) {
    const userString: string | null = getUser();
    if (userString !== null) {
      this.user = JSON.parse(userString);
    } else {
      this.user = null;
    }
  }

  ngOnInit() {
    this.getAllRoomChat();
  }

  async getAllRoomChat() {
    try {
      const response = await axios.get(
        'http://localhost:9288/api/v1/getAllRoomChat'
      );
      this.rooms = response.data.rooms;
    } catch (error) {}
  }
  joinRoom(room: Room) {
    this.selectedRoom = room;
  }
  async joinToRoom() {
    const param = {
      room_created_by_user_id: this.user?.user_id,
      room_password: this.createRoom.room_password,
      room_name: this.createRoom.room_name,
      room_name_select: this.selectedRoom.room_name,
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
}
