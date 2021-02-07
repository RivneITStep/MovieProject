import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ApiService } from '../core/api.service';
import { MovieModel } from '../models/movie/movie.model';
import { ApiResult } from '../models/result.model';
import { UserModel } from '../models/user.model';
import { MovieService } from '../services/movie-service/movie.service';
import { UserService } from '../services/user-service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private router: Router, private notifier: NotifierService, private apiService: ApiService, private userService: UserService, private movieService: MovieService) {
    this.isLoggedIn = apiService.isLoggedIn();
    if(this.isLoggedIn){
      const token = localStorage.getItem('token');
      if (token !== null) {
        const jwtData = token.split('.')[1];
        const decodedJwtJsonData = window.atob(jwtData);
        const decodedJwtData = JSON.parse(decodedJwtJsonData);
        
        this.userService.getUser(decodedJwtData.id).subscribe(
          (data: UserModel) => {
            this.user = data;
          }
        );
        this.userService.getUserMovies(decodedJwtData.id).subscribe(
          (data: MovieModel[]) => {
            this.movies = data;
          }
        );
      }
      
    }
  }

  isLoggedIn: boolean;
  user: UserModel = new UserModel();
  
  movies: MovieModel[] = [];

  watchMovie(id: number){
    this.router.navigate(['movies/' + id + '/watch']);
  }

  removeMovie(movieId: number){
    this.userService.deleteUserMovie(this.user.id, movieId).subscribe(
      (data: ApiResult) => {
        if(data.status == 200){
          this.notifier.notify('success', 'Movie removed');
          this.userService.getUserMovies(this.user.id).subscribe(
            (data: MovieModel[]) => {
              this.movies = data;
            }
          );
        }else{
          this.notifier.notify('error', 'Server error');
        }
      }
    );
  }

  editUser(){
    this.userService.editUser(this.user.id, this.user).subscribe(
      (data: ApiResult) => {
        if(data.status == 200){
          var userImg = document.getElementById("user-img") as HTMLImageElement;
          userImg.src = this.user.pictureUrl;
          this.notifier.notify('success','User edited');
        }else{
          this.notifier.notify('error','Server error');
        }
      }
    );
    

  }

  ngOnInit() {
  }

}
