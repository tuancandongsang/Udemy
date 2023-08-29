import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { getUser } from '../utills/localstorage/user';
import { setroomchat } from '../utills/localstorage/roomchat';

interface Room {
  room_id: number;
  room_name: string;
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
      console.log('response', response);

      this.rooms = response.data.rooms;
    } catch (error) {}
  }
  joinRoom(room: Room) {
    this.selectedRoom = room;
    console.log('this.selectedRoom', this.selectedRoom);
  }
  joinToRoom() {
    setroomchat(this.selectedRoom);
    this.router.navigate([
      `${this.user?.user_name}/room/${this.selectedRoom.room_name}`,
    ]);
  }
}
