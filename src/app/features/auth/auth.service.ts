import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/enviroment.prod';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  async login(email:string, password:string): Promise<void> {
    this.http.post<{token: string}>(`${environment.apiHost}/login_check`,
      {
        email: email,
        password: password
      }
     ).subscribe((value)=>{
      localStorage.setItem('token',value.token)
     })
  }

  logout() {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
