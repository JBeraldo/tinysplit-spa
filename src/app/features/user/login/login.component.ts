import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { catchError, throwError } from 'rxjs';
import { TsInput } from '../../../shared/components/ts-input/ts-input';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatButtonModule, TsInput],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  loginForm = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  async submit() {
    let loginData = this.loginForm.getRawValue();

    this.auth
      .login(loginData)
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        }),
      )
      .subscribe(() => this.router.navigate(['/']));
  }
}
