import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../../features/auth/auth.service";

export function AuthenticationInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    let auth = inject(AuthService);
    let token = auth.getAuthToken();
    let cloneReq = req.clone()

    if(auth.isAuthenticated()){
        cloneReq.headers.append('Authorization', `Bearer ${token}`)
    }

    return next(cloneReq)
}