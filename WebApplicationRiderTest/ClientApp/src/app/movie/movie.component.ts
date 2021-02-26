import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
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

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  constructor(private messageService: MessageService, private sanitizer: DomSanitizer, private actorService: ActorService, private reviewService: ReviewService, private activateRoute: ActivatedRoute, private movieService: MovieService, private userService: UserService, private apiService: ApiService) {
    this.id = activateRoute.snapshot.params['id'];
  }

  id: number;
  movie: MovieModel = new MovieModel();
  movieActors: ActorModel[] = [];
  hasActors: boolean;
  rate: number;

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

  getImg(url: string){
    let re = /\'/gi;
    let result = url.replace(re, '');
    return this.sanitizer.bypassSecurityTrustResourceUrl(result);
  }

  ngOnInit(){
    this.movieService.getMovie(this.id).subscribe(
      (data: MovieModel) => {
        this.movie = data;
        this.rate = parseInt(data.rating.toFixed(0));
      }
    );
    this.movieService.getMovieActors(this.id).subscribe(
      (data: ActorModel[]) => {
        this.movieActors = data;
        if(data.length < 1){
          this.hasActors = false;
        }else{
          this.hasActors = true;
        }
      }
    );
  }

}
