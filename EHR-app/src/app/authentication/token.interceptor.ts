import { HttpInterceptorFn, HttpErrorResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { AuthenticationService } from "../authentication/authentication.service";

/* this is called in app.config.ts provideHttpClient(), 
  HTTP interceptor that adds the JWT created on login (and stored in 
  sessionStorage) to auth header of every HTTP req sent so that JWT doesn't
  have to be added to every API call.
*/
export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthenticationService);

  // don't add token for public endpoints
  const publicEndpoints = [
    '/users/login'
  ]
  const isPublicEndpoint = publicEndpoints.some(url => req.url.endsWith(url));

  if (isPublicEndpoint) {
    return next(req);
  }

  // add token to req
  const token = sessionStorage.getItem('token');
  if (token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.error('Authentication failed, logging out.');
          authService.handleUnauthorized();
        }
        if (error.status === 403) {
          console.error('Access not authorized.');
        }
        return throwError(() => error);
      })
    );
  }

  // if no token, handleUnauthorized()
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.handleUnauthorized();
      }
      return throwError(() => error);
    })
  );

}