import { Component, OnInit } from '@angular/core';
import { MovieModel } from '../models/movie.model';
import { VideoModel } from '../models/video.model';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {

  constructor(private movieService: MovieService) { }

  movies: MovieModel[] = [];
  movie: MovieModel = new MovieModel();

  selectMovie(id: number){
    this.movieService.getMovie(id).subscribe(
      (data: MovieModel) => {
        this.movie = data;
        this.movieService.getMovieVideo(id).subscribe(
          (data: VideoModel) => {
            this.movie.url = data.url;
          }
        );
      }
    );
    var iframe = document.getElementsByTagName('iframe')[0] as HTMLIFrameElement;
    iframe.src = '//' + this.movie.url;
  }

  ngOnInit() {
    this.movieService.getMovies().subscribe(
      (data: MovieModel[]) => {
        this.movies = data;
      }
    );
    this.movie.name = 'To Watch';
  }

}
