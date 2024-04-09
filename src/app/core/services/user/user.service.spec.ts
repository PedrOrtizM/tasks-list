import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should call to sessionService if email and password are correct', () => {
    const userMock = { email: 'email@example.com', password: '123' };
    const spySession = spyOn(service['sessionService'],'setUserInfo')

    service.loginUser(userMock ).subscribe(data => {
      expect(data).toBeTruthy();
    });
    httpTestingController.expectOne(service['url']).flush([userMock]);

    expect(spySession).toHaveBeenCalled();
  });

  it('Should return an error if email and password are incorrect', () => {
    const userMock = { email: 'email@example.com', password: '123' };
    const spySession = spyOn(service['sessionService'], 'setUserInfo')

    service.loginUser(userMock).subscribe({
      error: (error) => expect(error).toBeTruthy()
    });
    httpTestingController.expectOne(service['url']).flush([]);

    expect(spySession).not.toHaveBeenCalled();
  });
});
