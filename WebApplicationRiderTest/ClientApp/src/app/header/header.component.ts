import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'oidc-client';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ApiService } from '../core/api.service';
import { ActorAddModel } from '../models/actor-add.model';
import { MovieAddModel } from '../models/movie-add.model';
import { ApiResult } from '../models/result.model';
import { UserModel } from '../models/user.model';
import { ActorService } from '../services/actor.service';
import { MovieService } from '../services/movie.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService, private actorService: ActorService, private movieService: MovieService, private userService: UserService, private apiService: ApiService, private router: Router, private spinner: NgxSpinnerService) {
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
  display: boolean = false;
  user = new UserModel();
  movieAdd: MovieAddModel = new MovieAddModel();
  actorAdd: ActorAddModel = new ActorAddModel();

  @HostListener('window:scroll', ['$event'])

  onWindowScroll(e) {
    let element = document.querySelector('.nav-menu');
    if (window.pageYOffset > element.clientHeight) {
      element.classList.add('nav-menu-inverse');
    } else {
      element.classList.remove('nav-menu-inverse');
    }
  }


  nav() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.main-nav');
    burger.addEventListener('click', () => {
      nav.classList.toggle('show')
    })
  }

  showAdminPanel() {
    this.display = true;
  }



  addActor() {
    this.actorService.addActor(this.actorAdd).subscribe(
      (data: ApiResult) => {
        if (data.status == 200) {
          this.messageService.add({ severity: 'success', summary: 'Notify', detail: 'Actor posted' });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Notify', detail: 'Server error' });
        }
      }
    );
    this.actorAdd = new ActorAddModel();
  }

  addMovie() {
    this.movieAdd.rating = 0;
    this.movieService.addMovie(this.movieAdd).subscribe(
      (data: ApiResult) => {
        if (data.status == 200) {
          this.messageService.add({ severity: 'success', summary: 'Notify', detail: 'Movie posted' });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Notify', detail: 'Server error' });
        }
      }
    );
    this.movieAdd = new MovieAddModel();
  }

  Logout() {
    this.apiService.Logout();
    this.isLoggedIn = false;
    this.user = new UserModel();
    this.router.navigate(['']);
  }

  ngOnInit() {
    document.addEventListener('DOMContentLoaded', this.nav)
    this.isLoggedIn = this.apiService.isLoggedIn();
    this.isAdmin = this.apiService.isAdmin();
  }

}
