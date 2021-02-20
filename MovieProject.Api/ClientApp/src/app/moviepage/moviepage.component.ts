import { Component, OnInit, SecurityContext } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../core/api.service';
import { UserModel } from '../models/user.model';
import { MovieService } from '../services/movie-service/movie.service';
import { UserService } from '../services/user-service/user.service';
import { ReviewAddModel } from '../models/reviewadd.model';
import { ReviewService } from '../services/review-service/review.service';
import { ApiResult } from '../models/result.model';
import { NotifierService } from 'angular-notifier';
import { ThrowStmt } from '@angular/compiler';
import { MovieModel } from '../models/movie/movie.model';
import { ActorModel } from '../models/actor/actor.model';
import { ReviewModel } from '../models/review/review.model';
import { ActorService } from '../services/actor-service/actor.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-moviepage',
  templateUrl: './moviepage.component.html',
  styleUrls: ['./moviepage.component.css']
})
export class MoviepageComponent implements OnInit {

  constructor(private sanitizer: DomSanitizer, private actorService: ActorService, private notifier: NotifierService, private reviewService: ReviewService, private activateRoute: ActivatedRoute, private movieService: MovieService, private userService: UserService, private apiService: ApiService) {
    this.id = activateRoute.snapshot.params['id'];
  }

  id: number;
  mark: number;
  isAdmin: boolean;
  isLoggedIn: boolean;

  movie: MovieModel = new MovieModel();
  review: ReviewModel = new ReviewModel();

  reviews: ReviewModel[] = [];
  actors: ActorModel[] = [];
  availableActors: ActorModel[] = [];
  users: UserModel[] = [];

  display: boolean = false;
  display2: boolean = false;

  getImg(){
    let re = /\'/gi;
    let result = this.movie.pictureUrl.replace(re, '');
    return this.sanitizer.bypassSecurityTrustResourceUrl(result);
  }

  getMovieImage(img: string){
    return this.sanitizer.bypassSecurityTrustStyle(`url(${img})`);
  }

  addToFav(){
    this.userService.addUserMovie(this.getCurrentUserId(), this.id).subscribe(
      (data: ApiResult) => {
        if(data.status == 200){
          this.notifier.notify('success','Liked');
        }else{
          this.notifier.notify('error','Server error');
        }
      }
    );
  }

  removeMovieActor(id: number) {
    this.movieService.deleteMovieActor(this.id, id).subscribe(
      (data: ApiResult) => {
        if (data.status == 200) {
          this.movieService.getMovieActors(this.id).subscribe(
            (data: ActorModel[]) => {
              this.actors = data;
            }
          );
          this.notifier.notify('success', 'Actor removed');
        } else {
          this.notifier.notify('error', 'Server error');
        }
      }
    );
  }

  addMovieActor(id: number) {
    this.movieService.addMovieActor(this.id, id).subscribe(
      (data: ApiResult) => {
        if (data.status == 200) {
          this.notifier.notify('success', 'Actor added');
          this.availableActors = this.availableActors.filter(function (el) {
            return el.id !== id;
          });
          this.actorService.getActor(id).subscribe(
            (data: ActorModel) => {
              this.actors.push(data);
            }
          );
        } else {
          this.notifier.notify('error', 'Server error');
        }
      }
    );
  }

  displayActors() {
    this.display = true;
  }

  displayMovieActors(){
    this.display2 = true;
  }

  getCurrentUserId() {
    const token = localStorage.getItem('token');
    const jwtData = token.split('.')[1];
    const decodedJwtJsonData = window.atob(jwtData);
    const decodedJwtData = JSON.parse(decodedJwtJsonData);
    return decodedJwtData.id;
  }

  postReview() {
    if (this.apiService.isLoggedIn()) {
      if (this.review.text != null && this.review.title != null) {
        this.review.movieId = this.id;
        this.review.userId = this.getCurrentUserId();
        this.reviewService.addReview(this.review).subscribe(
          (data: ApiResult) => {
            if (data.status == 200) {
              this.reviews.push(this.review);
              this.notifier.notify('success', 'Review added');
            } else {
              this.notifier.notify('success', 'Server error');
            }
          }
        );
      } else {
        this.notifier.notify('error', 'Enter review title and text');
      }
    } else {
      this.notifier.notify('error', 'Please log-in');
    }
  }

  rateMovie() {
    this.movieService.rateMovie(this.id, this.mark).subscribe(
      (data: ApiResult) => {
        if (data.status == 200) {
          this.movieService.getMovie(this.id).subscribe(
            (data: MovieModel) => {
              this.movie = data;
            }
          );
          this.notifier.notify('success', 'Rated');
        } else {
          this.notifier.notify('error', 'Server error');
        }
      }
    );
  }

  getUserName(userId: string) {
    let email = this.users.find(t => t.id == userId).email;
    return email.substring(0, email.lastIndexOf("@"));
  }

  ngOnInit() {
    this.movieService.getMovie(this.id).subscribe(
      (data: MovieModel) => {
        this.movie = data;
        document.getElementsByTagName('video')[0].src = this.movie.trailerUrl;
      }
    );
    this.reviewService.getMovieReviews(this.id).subscribe(
      (data: ReviewModel[]) => {
        this.reviews = data;
      }
    );
    this.movieService.getMovieActors(this.id).subscribe(
      (data: ActorModel[]) => {
        this.actors = data;
      }
    );
    this.userService.getUsers().subscribe(
      (data: UserModel[]) => {
        this.users = data;
      }
    );
    this.isAdmin = this.apiService.isAdmin();
    this.isLoggedIn = this.apiService.isLoggedIn();
    this.movieService.getMovieAvailableActors(this.id).subscribe(
      (data: ActorModel[]) => {
        this.availableActors = data;
      }
    );

  }
}
