import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { User } from '../../models/user/user.interface';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly url = '/users'

  constructor(
    private http: HttpClient,
    private sessionService: SessionService,) { }

  public loginUser(userAuth: Partial<User>): Observable<User | undefined> {

    return this.http.get<User[]>(this.url).pipe(
      map((userList) => {
        return userList.find((user) => user.email === userAuth.email && user.password === userAuth.password);
      }),
      switchMap((resp) => resp ? of(resp) : throwError(() => new Error(`Unauthorized`))),
      tap((user) => this.sessionService.setUserInfo(user)))
  }

  public getUsers() {
    return this.http.get(this.url);
  }

  public addUser(user: User) {
    return this.http.post(this.url, user);
  }
}
