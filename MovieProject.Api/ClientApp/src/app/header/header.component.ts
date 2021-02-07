import { MatInputModule } from '@angular/material/input';
import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ApiService } from '../core/api.service';
import { Router } from '@angular/router';
import { UserModel } from '../models/user.model';
import { UserService } from '../services/user-service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isExpanded = false;
  isLoggedIn: boolean;
  isAdmin: boolean;
  user: UserModel = new UserModel();


  constructor(private userService: UserService, private apiService: ApiService, private router: Router) {
    this.isLoggedIn = this.apiService.isLoggedIn();
    this.isAdmin = this.apiService.isAdmin();
    this.apiService.loginStatus.subscribe((status) => {
      this.isLoggedIn = status;
      this.isAdmin = this.apiService.isAdmin();
    });
    if (this.isLoggedIn == true) {
      const token = localStorage.getItem('token');
      if (token !== null) {
        const jwtData = token.split('.')[1];
        const decodedJwtJsonData = window.atob(jwtData);
        const decodedJwtData = JSON.parse(decodedJwtJsonData);
        this.user.id = decodedJwtData.id;
        this.user.email = decodedJwtData.email;
      }
    }
  }

  Logout() {
    this.apiService.Logout();
    this.router.navigate(['/']);
  }

  ngOnInit() {

  }

}
