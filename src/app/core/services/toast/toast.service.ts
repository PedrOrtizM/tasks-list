import { Injectable } from '@angular/core';
import { ToastInfo } from '../../models/toast/toast.interface';


@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: ToastInfo[] = [];

  constructor() { }

  public show(body: string, type?: 'danger' | 'success', delay?: number): void {
    this.toasts.push({ body, delay, className: `bg-${type || 'success'} text-light` });
  }

  public remove(toast: ToastInfo): void {
    this.toasts = this.toasts.filter(t => t != toast);
  }

}
