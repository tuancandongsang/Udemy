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
    console.log('this.selectedItemSubject', this.selectedItemSubject);
  }

  getSelectedItem(): Observable<any | null> {
    console.log(
      'this.selectedItemSubject.asObservable()',
      this.selectedItemSubject.asObservable()
    );

    return this.selectedItemSubject.asObservable();
  }
}
