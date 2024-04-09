import { TestBed } from '@angular/core/testing';
import { User } from '../../models/user/user.interface';

import { SessionService } from './session.service';

describe('SessionService', () => {
  let service: SessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionService);
    sessionStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save the userInfo in sessionStorage', () => {
    const userMock = { email: 'email@example.com' };
    service.setUserInfo(userMock)
    const userInfo = service.getUserInfo();
    expect(userInfo).toEqual(userMock as User) ;
  });

  it('should save the userInfo in sessionStorage created', () => {
    const spy = spyOn(sessionStorage, 'clear');
    service.logout();
    expect(spy).toHaveBeenCalled();
  });

  it('should return null', () => {
     const noInfo = service.getUserInfo();
     expect(noInfo).toBeNull();
   });
});
