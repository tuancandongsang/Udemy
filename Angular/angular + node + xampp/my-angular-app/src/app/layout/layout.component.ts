import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  public typeMenu = 'list';
  constructor(private router: Router) {}
  public selectMenu(type: any) {
    this.typeMenu = type;
  }
  public logout() {
    this.router.navigate(['/login']);
  }
  ngOnInit(): void {}
}
