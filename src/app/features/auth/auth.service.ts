import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/enviroment.prod';
import { StorageService } from '../storage/storage.service';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UserService } from '../user/user.service';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient); 
  private userService = inject(UserService)
  private storage = inject(StorageService)
  private router = inject(Router)

  login(email:string, password:string): Observable<{token:string, refresh_token:string }> {
  return this.http.post<{token:string, refresh_token:string }>(`${environment.apiHost}/login_check`,
      {
        email: email,
        password: password
      }
     ).pipe(tap((response)=>{
        this.storage.save(response)
     }))
  }

  refresh(): Observable<Object> {
    return this.http.post(`${environment.apiHost}/token/refresh`,
      {
        refresh_token: this.getRefreshToken()
      }
     )
  }

  getAuthToken(){
    return this.storage.getItem('token')
  }

  getRefreshToken(){
    return this.storage.getItem('refresh_token')
  }

  setAuthTokens(tokens: Object){
    this.storage.save(tokens)
  }
  
  logout() {
    console.log('banana')
    this.userService.clearUser()
    this.storage.removeItem('token')
    this.storage.removeItem('refresh_token')
  }

  isAuthenticated(): boolean {
    return !!this.storage.getItem('token');
  }
}
