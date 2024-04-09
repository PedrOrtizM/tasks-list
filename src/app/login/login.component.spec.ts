import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

const mockUser = {
  id: "2",
  name: "María",
  lastname: "Gómez",
  email: "maria@email.com",
  password: "123456"
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, ReactiveFormsModule],
      declarations: [ LoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should disable button when form is invalid', () => {

    component.userForm.patchValue({
      email: 'invalid-email',
      password: '1234567'
    });
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('#btn-login')).nativeElement;
    expect(btn.disabled).toBeTrue();
  });

  it('Should disable button when form is invalid', () => {
    const spyService = spyOn(component['userService'], 'loginUser').and.returnValue(of(mockUser));
    const spyRouter = spyOn(component['router'], 'navigate');
    component.userForm.patchValue({
      email: 'valid-email@email.com',
      password: '1234567'
    });
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('#btn-login')).nativeElement as HTMLButtonElement;
    expect(btn.disabled).toBeFalse();
    btn.click();
    expect(spyService).toHaveBeenCalled();

  });

  it('Should call to function and open the modal ', () => {
    const spyService = spyOn(component['userService'], 'loginUser').and.returnValue(throwError(()=>{ }));
    const spyModal = spyOn(component['toastService'], 'show');

    component.userForm.patchValue({
      email: 'valid-email@email.com',
      password: '1234567'
    });
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('#btn-login')).nativeElement as HTMLButtonElement;
    expect(btn.disabled).toBeFalse();
    btn.click();
    expect(spyService).toHaveBeenCalled();
    expect(spyModal).toHaveBeenCalled();

  });
});
