import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'oidc-client';
import { ApiService } from '../core/api.service';
import { UserModel } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UserService, private apiService: ApiService, private router: Router, private spinner: NgxSpinnerService) {
    router.events.subscribe(
      event => {
        if (event instanceof NavigationStart) {
          this.spinner.show();
          setTimeout(() => {
            this.spinner.hide();
          }, 1000);
          this.isLoggedIn = this.apiService.isLoggedIn();
          this.isAdmin = this.apiService.isAdmin();
          if (this.isLoggedIn) {
            this.user = this.apiService.getCurrentUser();
          }
        }
      }
    );
  }

  isLoggedIn: boolean;
  isAdmin: boolean;
  user = new UserModel();

  @HostListener('window:scroll', ['$event'])
  
  onWindowScroll(e) {
    let element = document.querySelector('.nav-menu');
    if (window.pageYOffset > element.clientHeight) {
      element.classList.add('nav-menu-inverse');
    } else {
      element.classList.remove('nav-menu-inverse');
    }
  }

  Logout(){
    this.apiService.Logout();
    this.isLoggedIn = false;
    this.user = new UserModel();
    this.router.navigate(['']);
  }

  ngOnInit() {
    this.isLoggedIn = this.apiService.isLoggedIn();
    this.isAdmin = this.apiService.isAdmin();
  }

}
