import { MatInputModule } from '@angular/material/input';
import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ApiService } from '../core/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isExpanded = false;
  isLoggedIn: boolean;
  isAdmin: boolean;


  constructor(private apiService: ApiService, private router: Router) {
    this.isLoggedIn = this.apiService.isLoggedIn();
    this.isAdmin = this.apiService.isAdmin();
    this.apiService.loginStatus.subscribe((status) => {
      this.isLoggedIn = status;
      this.isAdmin = this.apiService.isAdmin();

    });
  }

  Logout() {
    this.apiService.Logout();
    this.router.navigate(['/']);
  }

  ngOnInit() {
    
  }

}
