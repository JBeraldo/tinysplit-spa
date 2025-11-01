import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/enviroment.prod';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { RegisterUserPayload, User } from './user.model';
import { ApiResponse } from '../../shared/shared.types';


@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient); 
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();


  loadUser(): Observable<User> {
    return this.http.get<User>(`${environment.apiHost}/me`).pipe(
      tap((user) => this.userSubject.next(user))
    );
  }

  registerUser(userData:RegisterUserPayload): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${environment.apiHost}/register`,userData)
  }

  refreshUser(): void {
    this.loadUser().subscribe(); // trigger refresh
  }

  clearUser(): void {
    this.userSubject.next(null);
  }
    
}
