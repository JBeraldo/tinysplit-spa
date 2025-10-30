import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FontAwesomeModule],
  template: `<router-outlet></router-outlet>`,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('tinysplit');
  protected library = inject(FaIconLibrary)
  constructor(){
    this.library.addIconPacks(far,fas)
  }
}
