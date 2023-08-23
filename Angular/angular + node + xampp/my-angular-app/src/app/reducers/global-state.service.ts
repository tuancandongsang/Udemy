import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalStateService {
  private selectedItemSubject: BehaviorSubject<any | null> =
    new BehaviorSubject<any | null>(null);

  setSelectedItem(item: any) {
    this.selectedItemSubject.next(item);
  }

  getSelectedItem(): Observable<any | null> {
    return this.selectedItemSubject.asObservable();
  }

  private searchValue: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);
  setSearchValue(value: string) {
    this.searchValue.next(value);
  }
  getSearchValue(): Observable<string | null> {
    return this.searchValue.asObservable();
  }
}
