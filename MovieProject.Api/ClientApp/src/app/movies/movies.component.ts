import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MovieModel } from '../models/movie/movie.model';
import { MovieService } from '../services/movie-service/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  constructor(private movieService: MovieService) { }

  movies: MovieModel[] = [];
  count: number;
  page: number = 1;

  pageChanged(event){
    this.page = event;
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
          window.scrollTo(0, pos - 500);
      } else {
          window.clearInterval(scrollToTop);
      }
  }, 16);
  }


  ngOnInit() {
    this.movieService.getMovies().subscribe(
      (data: MovieModel[]) =>{
        this.movies = data;
        console.log(this.movies[0].name);
      }
    )
  }

}
