import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { UserModel } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
    router.events.subscribe(
      event => {
        if (event instanceof NavigationStart) {
          this.isLoggedIn = this.authService.isLoggedIn();
          if (this.isLoggedIn) {
            this.user = this.authService.getCurrentUser();
          }
        }
      }
    );
  }
  isLoggedIn: boolean = false;
  user: UserModel = new UserModel();

  logout() {
    localStorage.removeItem('token');
    this.authService.loginStatus.emit(false);
    this.isLoggedIn = false;
    this.user = new UserModel();
    this.router.navigate(['']);
  }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.user = this.authService.getCurrentUser();
    }
  }

}
