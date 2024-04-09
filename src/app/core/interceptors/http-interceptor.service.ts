import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ToastService } from '../services/toast/toast.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private readonly toastService: ToastService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const newReq = req.clone({
      url: environment.apiUrl + req.url
    })
    
    return next.handle(newReq).pipe(tap({ error: () => this.toastService.show( 'Error, intente nuevamente','danger') }));
  }
}
