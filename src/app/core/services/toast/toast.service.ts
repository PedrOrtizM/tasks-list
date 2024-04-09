import { Injectable } from '@angular/core';
import { ToastInfo } from '../../models/toast/toast.interface';


@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: ToastInfo[] = [];

  constructor() { }

  public show(body: string, delay?: number): void {
    this.toasts.push({ body, delay, className: 'bg-success text-light' });
  }

  public showError(body: string, delay?: number): void {
    this.toasts.push({ body, delay, className: 'bg-danger text-light' });
  }

  public remove(toast: ToastInfo): void {
    this.toasts = this.toasts.filter(t => t != toast);
  }

}
