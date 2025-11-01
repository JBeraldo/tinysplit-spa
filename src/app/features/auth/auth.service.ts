import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/enviroment.prod';
import { StorageService } from '../storage/storage.service';
import { Observable, tap } from 'rxjs';
import { UserService } from '../user/user.service';
import { LoginRequestPayload, LoginRequestResponse } from './auth.model';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private userService = inject(UserService)
  private storage = inject(StorageService)

  login(loginData: LoginRequestPayload): Observable<LoginRequestResponse> {
    return this.http.post<LoginRequestResponse>(`${environment.apiHost}/login_check`,
      {
        email: loginData.username,
        password: loginData.password
      }
    ).pipe(tap((response) => {
      this.storage.save(response)
    }))
  }

  refresh(): Observable<LoginRequestResponse> {
    return this.http.post<LoginRequestResponse>(`${environment.apiHost}/token/refresh`,
      {
        refresh_token: this.getRefreshToken()
      }
    )
  }

  getAuthToken() {
    return this.storage.getItem('token')
  }

  getRefreshToken() {
    return this.storage.getItem('refresh_token')
  }

  setAuthTokens(tokens: Object) {
    this.storage.save(tokens)
  }

  logout() {
    this.userService.clearUser()
    this.storage.removeItem('token')
    this.storage.removeItem('refresh_token')
  }

  isAuthenticated(): boolean {
    return !!this.storage.getItem('token');
  }
}
