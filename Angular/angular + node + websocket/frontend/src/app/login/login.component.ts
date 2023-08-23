import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import axios from 'axios';
// import {
//   setUserID,
//   setToken,
//   setRefreshToken,
// } from '../utills/helpers/localstorage';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  user: any = {}; // Đối tượng để lưu thông tin người dùng
  public typeLogin = 'login';
  constructor(private router: Router) {}
  public selectLogin(type: string) {
    this.typeLogin = type;
  }

  async login() {
    // this.router.navigate(['/list']);

    if (this.typeLogin === 'login') {
      // console.log('login', this.user);
      
    //   try {
    //     const response = await axios.post(
    //       ' http://localhost:8080/api/v1/login',
    //       this.user
    //     );
    //     const { message, refreshToken, token, id } = response.data;
    //     if (message || refreshToken || token || id) {
    //       setUserID(id);
    //       setToken(token);
    //       setRefreshToken(refreshToken);
    //       this.router.navigate(['/list']);
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    }
    if (this.typeLogin === 'register') {
      // console.log('login', this.user);
    //   try {
    //     const response = await axios.post(
    //       ' http://localhost:8080/api/v1/register',
    //       this.user
    //     );
    //     if (response.status === 200) {
    //       console.log('response', response);
    //       this.router.navigate(['/login']);
    //       this.typeLogin = 'login';
    //     }
    //   } catch (error) {}
    }
  }
}
