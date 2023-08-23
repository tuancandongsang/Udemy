import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalStateService } from '../reducers/global-state.service';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  public typeMenu = 'list';
  public searchValue: string = '';
  constructor(
    private router: Router,
    private globalStateService: GlobalStateService
  ) {}
  public selectMenu(type: any) {
    this.typeMenu = type;
  }
  public logout() {
    this.router.navigate(['/login']);
  }
  ngOnInit(): void {}
  async searchhandle() {
    if (this.searchValue.trim()) {
      this.globalStateService.setSearchValue(this.searchValue);
    }
  }
}
