import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Worker } from '../mocks.data';

@Injectable()
export class HttpInterceptorService  implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .do(
        event => {
          return Worker.clean;
        }
      )
      .catch(
        error => {
          const httpResponse = new HttpResponse({body: [Worker.clean]});
          return Observable.of(httpResponse);
        }
      );
  }
}
