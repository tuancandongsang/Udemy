import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { getUserID } from '../utills/helpers/localstorage';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  public typeMenu = 'list';
  public searchValue: string = '';
  constructor(private router: Router) {}
  public selectMenu(type: any) {
    this.typeMenu = type;
  }
  public logout() {
    this.router.navigate(['/login']);
  }
  ngOnInit(): void {}
  paramGet = {
    keyword: '',
    limit: 10,
    pageNumber: 1,
    userid: getUserID(),
  };
  searchhandle() {
    if (this.searchValue) {
      this.paramGet.keyword = this.searchValue;
      try {
        const response = axios.get(`http://localhost:8080/api/v1/users`, {
          params: this.paramGet,
        });
        console.log('res', response);
      } catch (error) {}
    }
  }
}
