import { Component, OnInit } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieModel } from '../models/movie/movie.model';
import { VideoModel } from '../models/video.model';
import { MovieService } from '../services/movie-service/movie.service';
import { DomSanitizer} from '@angular/platform-browser';
import { ApiService } from '../core/api.service';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {

  constructor(private apiService: ApiService, private activateRoute: ActivatedRoute, private movieService: MovieService, private sanitizer: DomSanitizer) {
    this.id = activateRoute.snapshot.params['id'];
  }

  id: number;
  movie: MovieModel = new MovieModel();
  video: VideoModel = new VideoModel();
  isLoggedIn: boolean;

  getVideoUrl(){
    return this.sanitizer.bypassSecurityTrustResourceUrl('//' + this.video.url);
  }

  ngOnInit() {
    this.movieService.getMovie(this.id).subscribe(
      (data: MovieModel) => {
        this.movie = data;
      }
    );
    this.movieService.getMovieVideo(this.id).subscribe(
      (data: VideoModel) => {
        this.video = data;
        //(document.getElementById('movie-video') as HTMLIFrameElement).src = this.video.url;
      }
    );
    this.isLoggedIn = this.apiService.isLoggedIn();
  }

}
