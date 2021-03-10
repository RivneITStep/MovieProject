import { Component, OnInit } from '@angular/core';
import { CinemaModel } from '../models/cinema.model';
import { MovieModel } from '../models/movie.model';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {

  constructor(private movieService: MovieService) { }

  movies: CinemaModel[] = [];

  ngOnInit() {
    this.movieService.getCinemaMovies().subscribe(
      (data: CinemaModel[]) => {
        this.movies = data;
      }
    );
  }

}
