import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  dataList: any[] = [];
  totalItems = 0;
  paramGet = {
    keyword: '',
    limit: 10,
    pageNumber: 1,
    userid: 1,
  };
  id: number = 1;

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadUsers();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const element = event.target as HTMLElement;
    if (
      (this.paramGet.pageNumber - 1) * this.paramGet.limit >
      this.totalItems
    ) {
      return;
    }
    if (
      element.scrollHeight - element.scrollTop <= element.clientHeight + 1 &&
      this.dataList
    ) {
      this.loadUsers();
    }
  }

  async loadUsers() {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/users', {
        params: this.paramGet,
      });
      const { totalItems, data } = response.data;
      this.dataList = [...this.dataList, ...data];
      this.totalItems = totalItems;
      this.paramGet.pageNumber++;
    } catch (error) {
      console.log('error', error);
    }
  }

  public editUser() {
    this.router.navigate(['/list/edit/1']);
  }

  public trackByFn(index: number, item: any): string {
    return item.id;
  }

  async deleteUser(item: any) {
    console.log('item', item);
    const id = item.id;
    try {
      const response = await axios.delete(`http://localhost:8080/api/v1/delete-user/${id}`
      );
      this.loadUsers()
    } catch (error) {
      console.log('error', error);
      
    }
  }
}
