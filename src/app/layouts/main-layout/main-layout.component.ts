import { Component, ViewChild, signal, computed, HostListener, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { menuItems } from '../../shared/menu-items';
import { UserService } from '../../features/user/user.service';
import { AuthService } from '../../features/auth/auth.service';
import { User } from '../../features/user/user.model';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule,
    MatSidenavContainer,
    MatSidenavContent,
    MatSidenav,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatBadgeModule,
    MatDividerModule,
    FontAwesomeModule,
  ],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  router = inject(Router);
  private userService = inject(UserService);
  private authService = inject(AuthService);

  // Signals for reactive state management
  isMobile = signal(false);
  isExpanded = signal(true);
  currentUser = signal<User | null>(null);

  // Menu items from shared configuration
  menuItems = menuItems;

  // Computed values
  sidenavMode = computed(() => this.isMobile() ? 'over' : 'side');
  sidenavOpened = computed(() => !this.isMobile() && this.isExpanded());
  userInitials = computed(() => {
    const user = this.currentUser();
    if (!user) return '?';
    return user.name
      .split(' ')
      .map(n => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  });
  userName = computed(() => this.currentUser()?.name || 'User');
  userEmail = computed(() => this.currentUser()?.email || '');

  constructor() {
    this.checkScreenSize();
  }

  ngOnInit() {
    // Load user data
    this.userService.user$.subscribe(user => {
      this.currentUser.set(user);
    });

    // Load user if not already loaded
    if (!this.currentUser()) {
      this.userService.loadUser().subscribe();
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isMobile.set(window.innerWidth < 768);
    if (this.isMobile()) {
      this.isExpanded.set(false);
    }
  }

  toggleSidenav() {
    this.isExpanded.update(value => !value);
    if (this.sidenav) {
      this.sidenav.toggle();
    }
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
    if (this.isMobile()) {
      this.sidenav.close();
    }
  }

  closeSidenavOnMobile() {
    if (this.isMobile() && this.sidenav) {
      this.sidenav.close();
    }
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
