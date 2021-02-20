import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MovieModel } from '../models/movie/movie.model';
import { MovieService } from '../services/movie-service/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  constructor(private movieService: MovieService, private sanitizer: DomSanitizer) { }

  filtersCountry: string[] = [];
  filtersGenre: string[] = [];
  filtersYear: string[] = [];
  selectedCountry: string[] = [];
  selectedGenre: string[] = [];
  selectedYear: string[] = [];
  movies: MovieModel[] = [];
  search: string;

  searchMovie(){
    if(this.search.length == 0){
      this.resetMovies();
    }else{
      this.movies = this.movies.filter(
        t => {
          let temp = t.name.toLocaleLowerCase() + ' ' + t.year + ' ' + t.country.toLocaleLowerCase();
          return temp.includes(this.search.toLocaleLowerCase());
        }
      );
    }
  }

  selectFilterCountry(filter: string){
    this.selectedCountry.push(filter);
    this.filtersCountry.splice(this.filtersCountry.indexOf(filter),1);
    if(this.selectedCountry.length > 1){
      this.resetMovies();
      let temp = this.movies.filter(s => this.selectedCountry.includes(s.country));
      this.movies = this.movies.concat(temp);
    }else{
      this.movies = this.movies.filter(s => this.selectedCountry.includes(s.country));
    }
    if(this.selectedCountry.length == 0){
      this.resetMovies();
    }
  }

  removeFilterCountry(filter: string){
    this.selectedCountry.splice(this.selectedCountry.indexOf(filter),1);
    this.filtersCountry.push(filter);
    this.movies = this.movies.filter(s => this.selectedCountry.includes(s.country));
    if(this.selectedCountry.length == 0){
      this.resetMovies();
    }
  }

  selectFilterGenre(filter: string){
    this.selectedGenre.push(filter);
    this.filtersGenre.splice(this.filtersGenre.indexOf(filter),1);
    if(this.selectedGenre.length > 1){
      this.resetMovies();
      let temp = this.movies.filter(s => this.selectedGenre.includes(s.genre));
      this.movies = this.movies.concat(temp);
    }else{
      this.movies = this.movies.filter(s => this.selectedGenre.includes(s.genre));
    }
    if(this.selectedGenre.length == 0){
      this.resetMovies();
    }
  }

  removeFilterGenre(filter: string){
    this.selectedGenre.splice(this.selectedGenre.indexOf(filter),1);
    this.filtersGenre.push(filter);
    this.movies = this.movies.filter(s => this.selectedGenre.includes(s.genre));
    if(this.selectedGenre.length == 0){
      this.resetMovies();
    }
  }

  selectFilterYear(filter: string){
    this.selectedYear.push(filter);
    this.filtersYear.splice(this.filtersYear.indexOf(filter),1);
    if(this.selectedYear.length > 1){
      this.resetMovies();
      let temp = this.movies.filter(s => this.selectedYear.includes(s.year.toString()));
      this.movies = this.movies.concat(temp);
    }else{
      this.movies = this.movies.filter(s => this.selectedYear.includes(s.year.toString()));
    }
    if(this.selectedYear.length == 0){
      this.resetMovies();
    }
  }

  removeFilterYear(filter: string){
    this.selectedYear.splice(this.selectedYear.indexOf(filter),1);
    this.filtersYear.push(filter);
    this.movies = this.movies.filter(s => this.selectedYear.includes(s.year.toString()));
    if(this.selectedYear.length == 0){
      this.resetMovies();
    }
  }

  getMovieImage(img: string){
    return this.sanitizer.bypassSecurityTrustStyle(`url(${img})`);
  }

  resetMovies(){
    this.movieService.getMovies().subscribe(
      (data: MovieModel[]) => {
        this.movies = data;
      }
    );
  }

  ngOnInit() {
    this.movieService.getMovies().subscribe(
      (data: MovieModel[]) =>{
        this.movies = data;
        this.movies.forEach(element => element.pictureUrl.replace("'",''));
      }
    );
    this.movieService.getFilterList('country').subscribe(
      (data: string[]) => {
        this.filtersCountry = data;
      }
    );
    this.movieService.getFilterList('year').subscribe(
      (data: string[]) => {
        this.filtersYear = data;
      }
    );
    this.movieService.getFilterList('genre').subscribe(
      (data: string[]) => {
        this.filtersGenre = data;
      }
    );
  }

}
