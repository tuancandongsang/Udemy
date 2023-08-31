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
  joinToRoom() {
    setroomchat(this.selectedRoom);

    // if (this.user?.user_name && this.selectedRoom.room_name) {
    //   this.router.navigate([
    //     `${this.user?.user_name}/room/${this.selectedRoom.room_name}`,
    //   ]);
    // }
    if(this.selectCreateroomchat === 'create') {
      console.log(this.user);
      const param = {
        room_name: "",
        room_password:'',
        room_created_by_user_id: ''
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
    console.log('selectroomchat', this.selectCreateroomchat);
  }

  selectPrivateRoom() {
    this.createRoom.room_private = !this.createRoom.room_private;
  }
}
