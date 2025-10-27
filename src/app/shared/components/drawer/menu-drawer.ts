import { Component } from '@angular/core';
import { menuItems } from '../../menu-items';
import { Avatar } from '../avatar/avatar';
@Component({
  selector: 'app-menu-drawer',
  imports: [Avatar],
  templateUrl: './menu-drawer.html',
  styleUrl: './menu-drawer.scss',
})
export class MenuDrawer {
  public menuItems = menuItems
}
