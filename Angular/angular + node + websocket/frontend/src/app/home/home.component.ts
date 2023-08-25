import { Component } from '@angular/core';
import { getUser } from '../utills/localstorage/user';
import { getroomchat } from '../utills/localstorage/roomchat';

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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  user: User | null; // Khai báo biến user
  roomchat: Roomchat | null;

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
      console.log('roomchat', this.roomchat);
    } else {
      this.roomchat = null;
    }
  }
}
