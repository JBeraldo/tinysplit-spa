import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCard, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {LoginComponent} from '../../user/login/login.component';
import {RegisterComponent} from '../../user/register/register.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [MatTabsModule, MatCard, LoginComponent, RegisterComponent,MatCardTitle,MatCardHeader],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
}
