import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MovieModel } from '../models/movie.model';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  constructor(private movieService: MovieService, private sanitizer: DomSanitizer) { }

  movies: MovieModel[] = [];
  allMovies: MovieModel[] = [];

  search: string = '';
  filtersCountry: string[] = [];
  filtersYear: string[] = [];
  filtersGenre: string[] = [];
  selectedCountry: string[] = [];
  selectedGenre: string[] = [];
  selectedYear: string[] = [];

  onCountryChange(e){
    if(e.target.checked){
      this.selectedCountry.push(e.target.value);
      this.movies = this.allMovies.filter(t => this.selectedCountry.includes(t.country));
    }else{
      this.selectedCountry.splice(this.selectedCountry.indexOf(e.target.value),1);
      this.movies = this.movies.filter(t => this.selectedCountry.includes(t.country));
    }
    if(this.movies.length === 0){
      this.resetMovies();
    }
  }

  onGenreChange(e){
    if(e.target.checked){
      this.selectedGenre.push(e.target.value);
      this.movies = this.allMovies.filter(t => this.selectedGenre.includes(t.genre));
    }else{
      this.selectedGenre.splice(this.selectedGenre.indexOf(e.target.value),1);
      this.movies = this.movies.filter(t => this.selectedGenre.includes(t.genre));
    }
    if(this.movies.length === 0){
      this.resetMovies();
    }
  }

  onYearChange(e){
    if(e.target.checked){
      this.selectedYear.push(e.target.value);
      this.movies = this.allMovies.filter(t => this.selectedYear.includes(t.year.toString()));
    }else{
      this.selectedYear.splice(this.selectedYear.indexOf(e.target.value),1);
      this.movies = this.movies.filter(t => this.selectedYear.includes(t.year.toString()));
    }
    if(this.movies.length === 0){
      this.resetMovies();
    }
  }

  getImg(url: string){
    let re = /\'/gi;
    let result = url.replace(re, '');
    return this.sanitizer.bypassSecurityTrustResourceUrl(result);
  }

  resetMovies(){
    this.movies = this.allMovies;
  }

  ngOnInit() {
    this.movieService.getMovies().subscribe(
      (data: MovieModel[]) => {
        this.allMovies = data;
        this.movies = data;
      }
    );
    this.movieService.getFilterList('country').subscribe(
      (data: string[]) => {
        this.filtersCountry = data;
      }
    );
    this.movieService.getFilterList('genre').subscribe(
      (data: string[]) => {
        this.filtersGenre = data;
      }
    );
    this.movieService.getFilterList('year').subscribe(
      (data: string[]) => {
        this.filtersYear = data;
      }
    );
  }

}
