import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  loginForm = this.fb.group({
    email: new FormControl<string>('', [Validators.email]),
    password: new FormControl<string>('')
  });

  loading = false;
  error: string | null = null;

  async onClick() {
    console.log(this.loginForm.value)
    let {email, password} = this.loginForm.value

    if(!email || !password || this.loginForm.invalid) return;

    try {
      await this.auth.login(email,password);
      this.router.navigate(['/']);
    } catch (err) {
      this.error = 'Invalid email or password.';
    } finally {
      this.loading = false;
    }
  }
}