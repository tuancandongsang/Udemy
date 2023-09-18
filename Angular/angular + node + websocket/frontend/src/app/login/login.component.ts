import { Component, DoCheck, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import {
  setUser,
  setToken,
  setRefreshToken,
} from '../utills/localstorage/user';
import { setroomchat } from '../utills/localstorage/roomchat';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements DoCheck {
  user: any = {}; // Đối tượng để lưu thông tin người dùng
  fileAvatarRoom: any = {};
  fileAvatarUser: any ={}
  public typeLogin = 'login';
  public message_error = '';
  private previousTypeLogin: string = this.typeLogin;

  constructor(private router: Router) {}

  ngDoCheck() {
    if (this.previousTypeLogin !== this.typeLogin) {
      this.message_error = '';
      this.user = {};
      this.previousTypeLogin = this.typeLogin;
    }
  }

  public selectLogin(type: string) {
    this.typeLogin = type;
  }

  // gửi ảnh giao diện room avatar lên serve
  async onFileSelectedRoomAvatarAPI(fileAvatarRoom: any) {
    const formDataRoom = new FormData();
    formDataRoom.append('avatarRoom', fileAvatarRoom); // 'avatar' là tên trường chứa tệp ảnh trên máy chủ

    // Gửi tệp ảnh lên máy chủ
    try {
      const responseAvatarImage = await axios.post(
        'http://localhost:9288/api/v1/uploadAvatarRoom',
        formDataRoom
      );

      this.user.room_avatar =
        'http://localhost:9288/uploads/' + responseAvatarImage.data.imagePath;
    } catch (error) {
      console.error('Lỗi khi tải lên ảnh:', error);
    }
  }

  // hiển thị ảnh giao diện trước rồi gửi serve sau user avatar
  onFileSelectedRoomAvatar(event: any) {
    this.fileAvatarRoom = event.target.files[0];

    if (this.fileAvatarRoom) {
      const reader = new FileReader();
      reader.readAsDataURL(this.fileAvatarRoom);

      reader.onload = () => {
        this.user.room_avatar = reader.result;
      };
    }
  }

  async onFileSelectedUserAvatarAPI(fileAvatarUser: any) {
    const formData = new FormData();
    formData.append('avatarUser', fileAvatarUser); // 'avatar' là tên trường chứa tệp ảnh trên máy chủ

    // Gửi tệp ảnh lên máy chủ
    try {
      const responseAvatarUserImage = await axios.post(
        'http://localhost:9288/api/v1/uploadAvatarUser',
        formData
      );

      this.user.user_avatar =
        'http://localhost:9288/uploads/' +
        responseAvatarUserImage.data.imagePath;
    } catch (error) {
      console.error('Lỗi khi tải lên ảnh:', error);
    }
  }

  onFileSelectedUserAvata (event: any) {
    this.fileAvatarUser = event.target.files[0];
    if (this.fileAvatarUser) {
      const reader = new FileReader();
      reader.readAsDataURL(this.fileAvatarUser);
      reader.onload = () => {
        this.user.user_avatar = reader.result;
      };
    }
  }

  async login() {
    if (this.user.roomName && this.user.createRoomName) {
      this.message_error = 'Chỉ chọn 1 trường room';
      return;
    }

    if (this.typeLogin === 'login') {
      if (!this.user.username || !this.user.password) {
        this.message_error = 'Thông tin đăng nhập chưa đủ';
        return;
      }
      try {
        if (this.user.createRoomName && !this.user.room_avatar) {
          this.message_error = 'Create Room Avarat required';
          return;
        }
        if (!this.user.createRoomName && this.user.room_avatar) {
          this.message_error = 'Create Room Name required';
          return;
        }
        if (this.user.createRoomName && this.user.room_avatar) {
          await this.onFileSelectedRoomAvatarAPI(this.fileAvatarRoom);
        }

        const response = await axios.post(
          ' http://localhost:9288/api/v1/login',
          this.user
        );

        const { message, refreshToken, token, user, chatrooms } = response.data;
        if (message || refreshToken || token || user || chatrooms) {
          setUser(user);
          setroomchat(chatrooms);
          setToken(token);
          setRefreshToken(refreshToken);
          this.message_error = '';
          if (this.user.roomName || this.user.createRoomName) {
            this.router.navigate([
              `${user.user_name}/room/${chatrooms.room_name}`,
            ]);
          } else {
            this.router.navigate([`/selectroomchat/${user.user_name}`]);
          }
        }
      } catch (error) {
        const errorResponse = error as {
          response: { data: { message: string } };
        };
        this.message_error = errorResponse.response.data.message;
      }
    }

    if (this.typeLogin === 'register') {
      if (
        !this.user.username ||
        !this.user.password ||
        !this.user.email ||
        !this.user.user_avatar
      ) {
        this.message_error = 'Thông tin đăng ký chưa đủ';
        return;
      }
      try {
        await this.onFileSelectedUserAvatarAPI (this.fileAvatarUser)
        const response = await axios.post(
          'http://localhost:9288/api/v1/register',
          this.user
        );
        this.message_error = '';
        this.typeLogin = 'login';
      } catch (error) {
        const errorResponse = error as {
          response: { data: { message: string } };
        };
        this.message_error = errorResponse.response.data.message;
      }
    }
  }

}
