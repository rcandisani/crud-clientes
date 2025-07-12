import { Component } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { PoPageModule } from '@po-ui/ng-components';
import { PoToolbarModule } from '@po-ui/ng-components';
import { PoMenuItem } from '@po-ui/ng-components';
import { PoMenuModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports:[
    RouterModule,
    PoPageModule,
    PoToolbarModule,
    PoMenuModule
  ]
})
export class AppComponent {
  menuItemSelected = '';
  
  menus: Array<PoMenuItem> = [
    {
      label: 'Home',
      action: () => this.navigateTo('home'),
      icon: 'po-icon-home',
      shortLabel: 'Home'
    },
    {
      label: 'Clientes',
      action: () => this.navigateTo('clientes'),
      icon: 'po-icon-users',
      shortLabel: 'Clientes'
    },
    {
      label: 'Sobre',
      action: () => this.navigateTo('sobre'),
      icon: 'po-icon-info',
      shortLabel: 'Sobre'
    }
  ];

  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.menuItemSelected = route.charAt(0).toUpperCase() + route.slice(1);
    this.router.navigate([`/${route}`]);
  }
}