import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios'
import {getUserID} from "../utills/helpers/localstorage"
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  constructor(private router: Router) {}
  user: any = {}; // Đối tượng để lưu thông tin người dùng

  async addUser() {
    console.log('User Info:', this.user);
    this.user = {...this.user, userid: getUserID()}
   try {
    const response = await axios.post("http://localhost:8080/api/v1/create-user", this.user)

    console.log('response', response.data.message);
    this.router.navigate(['/']);
   } catch (error) {
    
   }

  }
  public canelAddUser() {
    this.router.navigate(['/']);
  }
}
