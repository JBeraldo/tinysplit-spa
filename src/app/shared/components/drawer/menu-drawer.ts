import { Component, inject, OnInit } from '@angular/core';
import { menuItems } from '../../menu-items';
import { Avatar } from '../avatar/avatar';
import { UserService } from '../../../features/user/user.service';
import { AsyncPipe } from '@angular/common';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-menu-drawer',
  imports: [Avatar, AsyncPipe, FaIconComponent, RouterLink],
  templateUrl: './menu-drawer.html',
  styleUrl: './menu-drawer.scss',
})
export class MenuDrawer implements OnInit{
  private userService = inject(UserService)
  public menuItems = menuItems
  public user$ =  this.userService.user$

  ngOnInit(): void {
    this.userService.refreshUser();
  }
}
