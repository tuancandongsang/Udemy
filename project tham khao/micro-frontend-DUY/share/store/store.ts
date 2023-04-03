type TWindow = {
  sharedText: Observable<string>;
  setSharedText: (sharedText: string) => void;
  createSubscription: () => Subscription;
  tap: <T>(value: T) => void;
  initedStore: boolean;
} & globalThis.Window;

import { BehaviorSubject, Observable, Subscription, tap } from "rxjs";

const windowStore = window as unknown as TWindow;

if (!windowStore.initedStore) {
  windowStore.initedStore = true;
  const sharedTextSubject = new BehaviorSubject<string>("");
  windowStore.sharedText = sharedTextSubject.asObservable();

  windowStore.setSharedText = (sharedText: string) => {
    // const currentValue = fullScreenSubject.value;
    sharedTextSubject.next(sharedText);
  };
  windowStore.getShared = (sharedText: string) => {
    // const currentValue = fullScreenSubject.value;
    sharedTextSubject.next(sharedText);
  };

  windowStore.createSubscription = () => new Subscription();

  windowStore.tap = () => tap;
}

export default windowStore;
