import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators, NonNullableFormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { catchError, tap, throwError } from 'rxjs';
import { AlertService } from '../../../shared/components/alert/alert.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  private fb = inject(NonNullableFormBuilder);
  private userService = inject(UserService)
  private router = inject(Router)
  private alert = inject(AlertService)

  registerForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  async onClick() {
    let userData = this.registerForm.getRawValue()

    this.userService.registerUser(userData).pipe(catchError(err => {
      this.alert.error(err.message)
      return throwError(() => err)
    }),
    tap(res => this.alert.success(res.message))
    ).subscribe(() => this.router.navigate(['/login']))
  }
}