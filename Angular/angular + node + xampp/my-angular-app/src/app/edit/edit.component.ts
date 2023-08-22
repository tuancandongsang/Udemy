import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalStateService } from '../reducers/global-state.service';
import axios from 'axios';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  constructor(private router: Router, private globalStateService: GlobalStateService) {}

  selectedItem: any = { firstName: '' };
  ngOnInit() {
    this.globalStateService.getSelectedItem().subscribe((item) => {
      this.selectedItem = item;
    });
  }

  public async editUser() {
    console.log('this.selectedItem', this.selectedItem);
   try {
    const response = axios.put(`http://localhost:8080/api/v1/update-user/${this.selectedItem.id}`,this.selectedItem )
    console.log('response', (await response).data.message);
    this.router.navigate(['/']);
   } catch (error) {
    console.log(error);
    
   }
    
  }
  public canelAddUser() {
    this.router.navigate(['/']);
  }

}
