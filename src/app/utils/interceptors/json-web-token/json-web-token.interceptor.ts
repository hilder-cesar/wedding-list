import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthenticationService } from 'src/app/utils/services/authentication/authentication.service';
import { Observable } from 'rxjs';

@Injectable()
export class JsonWebTokenInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  intercept(httpRequest: HttpRequest<unknown>, httpHandler: HttpHandler): Observable<HttpEvent<unknown>> {
    const authentication = this.authenticationService.getAuthentication();
    if (authentication && authentication.accessToken !== undefined) {
      httpRequest = httpRequest.clone({
        setHeaders: {
          Authorization: `Bearer ${authentication.accessToken}`
        }
      });
    }
    return httpHandler.handle(httpRequest);
  }
}
