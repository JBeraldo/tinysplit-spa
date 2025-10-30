import { HttpEvent, HttpHandlerFn, HttpHeaders, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, Observable, switchMap, tap, throwError } from "rxjs";
import { AuthService } from "../../features/auth/auth.service";

export function RefreshTokenInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    let auth = inject(AuthService);
    const cloneReq = getRequestWithUpdatedToken(req, auth);

    if (!auth.isAuthenticated || req.url.includes('/token/refresh')) {
        return next(cloneReq)
    }



    return next(cloneReq).pipe(catchError((error) => {
        if (error.status !== 401) {
            return throwError(() => error)
        }

        return auth.refresh().pipe(
            tap((rtResponse) =>
                auth.setAuthTokens(rtResponse)
            ),
            switchMap(() => next(getRequestWithUpdatedToken(req, auth)))
        )
        
    }))
}

const getRequestWithUpdatedToken = (req: HttpRequest<any>, authService: AuthService) => {
    const token = authService.getAuthToken();
    if (!token) return req;

    const headers = new HttpHeaders().append('Authorization', `Bearer ${token}`);
    return req.clone({
        headers,
    });
}