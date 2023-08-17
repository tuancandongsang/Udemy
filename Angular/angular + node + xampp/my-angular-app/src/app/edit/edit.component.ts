import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  constructor(private router: Router) {}
  public editUser() {
    this.router.navigate(['/']);
  }
  public canelAddUser() {
    this.router.navigate(['/']);
  }
}
