import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AlertService } from '../../../shared/components/alert/alert.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router)
  private alert= inject(AlertService)


  loginForm = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  async onClick() {

    let loginData = this.loginForm.getRawValue()

    this.auth.login(loginData).pipe(
      catchError(err => 
        {
          this.alert.error(err.message)
          return throwError(()=>err)
        }),
    ).subscribe(() => this.router.navigate(['/']))
  }
}