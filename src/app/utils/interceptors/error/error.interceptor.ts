import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthenticationService } from 'src/app/utils/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<any> {
    return httpHandler.handle(httpRequest)
      .pipe(
        catchError((responseOne: any) => {
          if (responseOne.status === 401) {
            this.authenticationService.unsetAuthentication();
            this.router.navigate(['login']);
          }
          return throwError(responseOne.error || responseOne);
        })
      );
  }

}
