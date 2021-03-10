import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'oidc-client';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ApiService } from '../core/api.service';
import { ActorModel } from '../models/actor.model';
import { MovieModel } from '../models/movie.model';
import { PhotoModel } from '../models/photo.model';
import { ApiResult } from '../models/result.model';
import { ReviewModel } from '../models/review.model';
import { UserModel } from '../models/user.model';
import { ActorService } from '../services/actor.service';
import { MovieService } from '../services/movie.service';
import { ReviewService } from '../services/review.service';
import { UserService } from '../services/user.service';
import jwt_decode from 'jwt-decode';
import { PhotoService } from '../services/photo.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { EditableColumn } from 'primeng/table';
import { VideoModel } from '../models/video.model';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css', './movie.media.css']
})
export class MovieComponent implements OnInit {

  constructor(private router: Router, private confirmationService: ConfirmationService, private photoService: PhotoService, private messageService: MessageService, private sanitizer: DomSanitizer, private actorService: ActorService, private reviewService: ReviewService, private activateRoute: ActivatedRoute, private movieService: MovieService, private userService: UserService, private apiService: ApiService) {
    this.id = activateRoute.snapshot.params['id'];
  }

  id: number;
  currentUserId: string;

  fav: boolean;
  isAdmin: boolean;
  isLoggedIn: boolean;
  display: boolean = false;
  display2: boolean = false;
  display3: boolean = false;
  display4: boolean = false;
  display5: boolean = false;

  users: UserModel[] = [];
  favMovies: MovieModel[] = [];

  movie: MovieModel = new MovieModel();
  movieEdit: MovieModel = new MovieModel();
  movieActors: ActorModel[] = [];
  movieAvailableActors: ActorModel[] = [];
  movieReviews: ReviewModel[] = [];
  hasActors: boolean;
  review: ReviewModel = new ReviewModel();
  rate: number;
  videoAdd: VideoModel = new VideoModel();

  addMovieVideo(){
    this.videoAdd.id = 0;
    this.videoAdd.price = 0;
    this.movieService.addMovieVideo(this.id, this.videoAdd).subscribe(
      (data: ApiResult) => {
        if(data.status == 200){
          this.messageService.add({ severity: 'success', summary: 'Notify', detail: 'Video added' });
        }else{
          this.messageService.add({ severity: 'error', summary: 'Notify', detail: 'Server error' });
        }
      }
    );
  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this movie?',
      accept: () => {
        this.deleteMovie();
      }
    });
  }

  deleteMovie() {
    this.movieService.deleteMovie(this.id).subscribe(
      (data: ApiResult) => {
        if (data.status == 200) {
          this.messageService.add({ severity: 'success', summary: 'Notify', detail: 'Movie deleted' });
          this.router.navigate(['/movies']);
        } else {
          this.messageService.add({ severity: 'error', summary: 'Notify', detail: 'Server error' });
        }
      }
    );
  }

  showActorManager() {
    this.display = true;
  }

  showActorManager2() {
    this.display2 = true;
  }

  showTrailer() {
    this.display3 = true;
  }

  showAddVideo(){
    this.display5 = true;
  }

  showEditMovie() {
    this.movieService.getMovie(this.id).subscribe(
      (data: MovieModel) => {
        this.movieEdit = data;
      }
    );
    this.display4 = true;
  }

  editMovie() {
    this.movieService.editMovie(this.movieEdit).subscribe(
      (data: ApiResult) => {
        if (data.status == 200) {
          this.messageService.add({ severity: 'success', summary: 'Notify', detail: 'Movie edited' });
          this.movieService.getMovie(this.id).subscribe(
            (data: MovieModel) => {
              this.movie = data;
            }
          );
        } else {
          this.messageService.add({ severity: 'error', summary: 'Notify', detail: 'Server error' });
        }
      }
    );
  }

  deleteMovieActor(id: number) {
    this.movieService.deleteMovieActor(this.id, id).subscribe(
      (data: ApiResult) => {
        if (data.status == 200) {
          this.movieService.getMovieActors(this.id).subscribe(
            (data: ActorModel[]) => {
              this.movieActors = data;
            }
          );
          this.messageService.add({ severity: 'success', summary: 'Notify', detail: 'Actor deleted' });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Notify', detail: 'Server error' });
        }
      }
    );
  }

  addMovieActor(id: number) {
    this.movieService.addMovieActor(this.id, id).subscribe(
      (data: ApiResult) => {
        if (data.status == 200) {
          this.movieService.getMovieAvailableActors(this.id).subscribe(
            (data: ActorModel[]) => {
              this.movieAvailableActors = data;
            }
          );
          this.movieService.getMovieActors(this.id).subscribe(
            (data: ActorModel[]) => {
              this.movieActors = data;
            }
          );
          this.messageService.add({ severity: 'success', summary: 'Notify', detail: 'Actor added to movie' });
        } else {
          this.messageService.add({ severity: 'success', summary: 'Notify', detail: 'Server error' });
        }
      }
    );
  }

  sendReview() {
    if (this.review.text === '' || this.review.title === '') {
      this.messageService.add({ severity: 'error', summary: 'Notify', detail: 'Enter all fields' });
    } else {
      this.review.movieId = this.id;
      this.review.userId = this.currentUserId;
      this.reviewService.addReview(this.review).subscribe(
        (data: ApiResult) => {
          if (data.status == 200) {
            this.messageService.add({ severity: 'success', summary: 'Notify', detail: 'Review posted' });
            this.reviewService.getMovieReviews(this.id).subscribe(
              (data: ReviewModel[]) => {
                this.movieReviews = data;
              }
            );
          }
        }
      );
    }
  }

  favChange(e) {
    if (e.checked == true) {
      this.userService.addUserMovie(this.currentUserId, this.id).subscribe(
        (data: ApiResult) => {
          if (data.status == 200) {
            console.log('success');
          } else {
            console.log('error');
          }
        }
      );
    } else {
      this.userService.deleteUserMovie(this.currentUserId, this.id).subscribe(
        (data: ApiResult) => {
          if (data.status == 200) {
            console.log('success');
          } else {
            console.log('error');
          }
        }
      );
    }
  }

  rateMovie() {
    this.movieService.rateMovie(this.id, this.rate).subscribe(
      (data: ApiResult) => {
        if (data.status == 200) {
          this.movieService.getMovie(this.id).subscribe(
            (data: MovieModel) => {
              this.movie = data;

            }
          );
        }
      }
    );
  }

  getUserName(id: string) {
    return this.users.find(x => x.id === id).email.replace(/@[^@]+$/, '');
  }

  getUserImg() {
    return 'https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/avat-01-512.png';
  }

  getImg(url: string) {
    let re = /\'/gi;
    let result = url.replace(re, '');
    return this.sanitizer.bypassSecurityTrustResourceUrl(result);
  }

  ngOnInit() {
    this.movieService.getMovie(this.id).subscribe(
      (data: MovieModel) => {
        this.movie = data;
        this.rate = parseInt(data.rating.toFixed(0));
      }
    );
    this.movieService.getMovieActors(this.id).subscribe(
      (data: ActorModel[]) => {
        this.movieActors = data;
        if (data.length < 1) {
          this.hasActors = false;
        } else {
          this.hasActors = true;
        }
      }
    );
    this.reviewService.getMovieReviews(this.id).subscribe(
      (data: ReviewModel[]) => {
        this.movieReviews = data;
      }
    );
    this.currentUserId = (jwt_decode(localStorage.getItem('token')) as UserModel).id;
    this.userService.getUsers().subscribe(
      (data: UserModel[]) => {
        this.users = data;
      }
    );
    this.movieService.getMovieAvailableActors(this.id).subscribe(
      (data: ActorModel[]) => {
        this.movieAvailableActors = data;
      }
    );

    this.userService.getUserMovies(this.currentUserId).subscribe(
      (data: MovieModel[]) => {
        this.favMovies = data;
      }
    );

    setTimeout(() => {
      this.fav = false;
      for (var i = 0; i < this.favMovies.length; i++) {
        if (this.favMovies[i].id === this.movie.id) {
          this.fav = true;
          break;
        }
      }
      console.log(this.fav);
    }, 1000);


    this.isAdmin = this.apiService.isAdmin();
    this.isLoggedIn = this.apiService.isLoggedIn();
  }

}
