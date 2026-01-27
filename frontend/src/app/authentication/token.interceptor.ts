import { HttpInterceptorFn, HttpErrorResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { AuthenticationService } from "../authentication/authentication.service";


export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  	const authService = inject(AuthenticationService);

  	// const authReq = req.clone({
    // 	withCredentials: true
  	// });

  // need this?
	const token = typeof window !== 'undefined' ? sessionStorage.getItem('token') : null;
	const headers = token ? req.headers.set('Authorization', `Bearer ${token}`) : req.headers;
	const authReq = req.clone({ withCredentials: true, headers });

  // if cookie invalid or expired, handleUnauthorized()
  	return next(authReq).pipe(
    	catchError((error: HttpErrorResponse) => {
      		if (error.status === 401) {
        		authService.handleUnauthorized();
     	 	}
      	return throwError(() => error);
    	})
  	);

}