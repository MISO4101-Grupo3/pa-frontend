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

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.handleAuth();
  }

  private handleAuth(): void {
    this.authSubscription = this.authService.isLoggedIn.subscribe(authStatus => {
      this.isLoggedIn = authStatus;
    });
  }

  logOut(): void {
    this.authService.logout();
  }

}
