import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

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
  private router =  inject(Router)

  loginForm = this.fb.group({
    email: new FormControl<string>('', [Validators.email]),
    password: new FormControl<string>('')
  });

  loading = false;
  error: string | null = null;

  async onClick() {
    let {email, password} = this.loginForm.value

    if(!email || !password || this.loginForm.invalid) return;

    try {
      this.auth.login(email,password).subscribe(()=>
        this.router.navigate(['/'])
      )
    } catch (err) {
      this.error = 'Invalid email or password.';
    } finally {
      this.loading = false;
    }
  }
}