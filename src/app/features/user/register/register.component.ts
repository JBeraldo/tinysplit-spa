import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators, NonNullableFormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { catchError, throwError } from 'rxjs';
import {MatButton} from '@angular/material/button';
import {MatCardActions, MatCardContent} from '@angular/material/card';
import {TsInput} from '../../../shared/components/ts-input/ts-input';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButton, MatCardActions, MatCardContent, TsInput],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  private fb = inject(NonNullableFormBuilder);
  private userService = inject(UserService);
  private router = inject(Router);

  registerForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  async submit() {
    let userData = this.registerForm.getRawValue();

    this.userService
      .registerUser(userData)
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        }),
      )
      .subscribe(() => this.router.navigate(['/login']));
  }
}
