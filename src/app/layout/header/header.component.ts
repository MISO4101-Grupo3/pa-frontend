import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean;

  authSubscription: Subscription;

  name: String;

  actions: any[];

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.actions = [
      {
        label: 'Actualizar Datos', icon: 'fa-pencil', routerLink: "update-profile" 
      },
      {
        label: 'Salir', icon: 'fa-times', command: () => this.logOut()
      }
    ];
    this.handleAuth();
  }

  private handleAuth(): void {
    this.authSubscription = this.authService.isLoggedIn.subscribe(authStatus => {
      this.isLoggedIn = authStatus;
      this.name = this.authService.userName;
    });
  }

  logOut(): void {
    this.authService.logout();
  }

}
