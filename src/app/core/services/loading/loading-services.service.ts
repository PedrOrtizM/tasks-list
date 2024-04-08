import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public isLoading = new BehaviorSubject(false);

  public show(): void {
    this.isLoading.next(true);
  }

  public hide(): void {
      this.isLoading.next(false);
  }
}
