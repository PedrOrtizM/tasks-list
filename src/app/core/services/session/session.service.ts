import { Injectable } from '@angular/core';
import { User } from '../../models/user/user.interface';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private readonly userInfoKey = 'userInfo';

  public setUserInfo(value: Object) {
    this.setItem(this.userInfoKey, JSON.stringify(value));
  }

  public getUserInfo(): User | null {
    const result = this.getItem(this.userInfoKey);
    if (!result) return null;
    return JSON.parse(result);
  }

  public logout(): void {
    sessionStorage.clear();
  }
  private setItem(key: string, value: string) {
    sessionStorage.setItem(key, value);
  };

  private getItem(item: string) {
    return sessionStorage.getItem(item);
  }
}
