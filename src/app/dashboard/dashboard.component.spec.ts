import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should clear session and navigate to root', () => {
    const spyRouter = spyOn(component['router'], 'navigate');
    const spySession = spyOn(component['sessionService'], 'logout');
    const logoutBtn = fixture.debugElement.query(By.css('#btn-logout')).nativeElement as HTMLButtonElement;
    logoutBtn.click();
    expect(spyRouter).toHaveBeenCalledWith(['/']);
    expect(spySession).toHaveBeenCalledWith();
  });
  
});
