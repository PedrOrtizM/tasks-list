import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, finalize, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { LoadingService } from '../services/loading/loading-services.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private readonly loading: LoadingService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loading.show();
    
    const newReq = req.clone({
      url: environment.apiUrl + req.url
    })

    return next.handle(newReq).pipe(delay(2000), finalize(() => this.loading.hide()));
  }
}
