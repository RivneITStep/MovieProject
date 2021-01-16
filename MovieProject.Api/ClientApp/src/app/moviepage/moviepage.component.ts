import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../core/api.service';
import { ActorModel } from '../Models/actor.model';
import { MovieModel } from '../Models/movie.model';
import { ReviewModel } from '../Models/review.model';
import { UserModel } from '../Models/user.model';
import { MovieService } from '../services/movie-service/movie.service';
import { UserService } from '../services/user-service/user.service';
import { ReviewAddModel } from '../Models/reviewadd.model';
import { ReviewService } from '../services/review-service/review.service';
import { ApiResult } from '../Models/result.model';
import { NotifierService } from 'angular-notifier';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-moviepage',
  templateUrl: './moviepage.component.html',
  styleUrls: ['./moviepage.component.css']
})
export class MoviepageComponent implements OnInit {

  constructor(private notifier: NotifierService, private activateRoute: ActivatedRoute, private movieService: MovieService, private apiService: ApiService, private userService: UserService, private reviewService: ReviewService) {
    this.id = activateRoute.snapshot.params['id'];
    this.isLoggedIn = this.apiService.isLoggedIn();

    if (this.isLoggedIn === true) {
      const token = localStorage.getItem('token');
      const jwtData = token.split('.')[1];
      const decodedJwtJsonData = window.atob(jwtData);
      const decodedJwtData = JSON.parse(decodedJwtJsonData);
      this.userService.getUser(decodedJwtData.id).subscribe(
        (data: UserModel) => {
          this.username = data.email;
        }
      );
    }
  }

  id: number;
  thisUrl: string;
  movie: MovieModel = new MovieModel();
  movieActors: ActorModel[] = [];
  isLoggedIn: boolean;
  review: ReviewAddModel = new ReviewAddModel();
  reviews: ReviewModel[] = [];
  users: UserModel[] = [];
  username: string;
  isError: boolean = false;

  postComment() {
    if (this.isLoggedIn) {
      const token = localStorage.getItem('token');
      const jwtData = token.split('.')[1];
      const decodedJwtJsonData = window.atob(jwtData);
      const decodedJwtData = JSON.parse(decodedJwtJsonData);
      this.review.userId = decodedJwtData.id;
      this.review.movieId = this.id;

      if (this.review.title === null) {
        this.isError = true;
        this.notifier.notify('error', 'Enter title');
      }
      if (this.review.text === null) {
        this.isError = true;
        this.notifier.notify('error', 'Enter text');
      }

      if (this.isError === false) {
        this.reviewService.addReview(this.review).subscribe(
          (data: ApiResult) => {
            if (data.status == 200) {
              this.notifier.notify('success', 'Comment posted');
            } else {
              this.notifier.notify('error', 'Error');
            }
          }
        );
        window.location.reload();
      }
      this.isError = false;
    } else {
      this.notifier.notify('error','Please log-in to post your comment');
    }
  }

  getReviewUserName(id: string) {
    var name;
    this.users.forEach(element => {
      if(element.id == id){
        name = element.email;
      }
    });
    if(name == null){
      return name;
    }else{
      return name.match(/^([^@]*)@/)[1];
    }
  }

  ngOnInit() {
    this.review.title = null;
    this.review.text = null;
    this.movieService.getMovie(this.id).subscribe(
      (data: MovieModel) => {
        this.movie = data;
        console.log(data.name);
      }
    );

    this.movieService.getMovieActors(this.id).subscribe(
      (data: ActorModel[]) => {
        this.movieActors = data;
        console.log(data[0].name);
      }
    );

    this.reviewService.getMovieReviews(this.id).subscribe(
      (data: ReviewModel[]) => {
        this.reviews = data;
        console.log(this.reviews[0].title);
      }
    );

    this.userService.getUsers().subscribe(
      (data: UserModel[]) => {
        this.users = data;
        console.log(this.users[0].email);
      }
    );

  }

}
