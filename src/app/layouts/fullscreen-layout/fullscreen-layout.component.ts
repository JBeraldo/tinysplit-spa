import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fullscreen-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
  ],
  templateUrl: './fullscreen-layout.component.html',
  styleUrls: ['./fullscreen-layout.component.scss'],
})
export class FullscreenLayoutComponent {}