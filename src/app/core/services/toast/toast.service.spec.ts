import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add new toast to list', () => {
    service.show('example');
    expect(service.toasts.length).toBe(1);
  });
  it('should add new toast error to list', () => {
    service.show('example', 'danger');
    expect(service.toasts.length).toBe(1);
  });

  it('should remote the  toast error from list', () => {
    service.show('example', 'danger');
    service.remove(service.toasts[0]);
    expect(service.toasts.length).toBe(0);
  });

});
