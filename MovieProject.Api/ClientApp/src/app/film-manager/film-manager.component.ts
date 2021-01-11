import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { MovieModel } from '../Models/movie.model';
import { ApiResult } from '../Models/result.model';
import { MovieService } from '../services/movie-service/movie.service';

@Component({
  selector: 'app-film-manager',
  templateUrl: './film-manager.component.html',
  styleUrls: ['./film-manager.component.css']
})

export class FilmManagerComponent implements OnInit {

  isError: boolean = false;
  div1: boolean = true;
  div2: boolean = false;
  list: MovieModel[] = [];
  editMovieId: number;
  movie: MovieModel = new MovieModel();

  constructor(private movieService: MovieService, private spinner: NgxSpinnerService, private notifier: NotifierService) { }

  showAddMovie() {
    this.div1 = true;
    this.div2 = false;
  }

  showEditMovie(id: number) {
    this.div1 = false;
    this.div2 = true;
    this.editMovieId = id;
  }

  deleteMovie(id: number){
    this.movieService.deleteMovie(id).subscribe(
      
    )
  }

  postMovie() {
    this.spinner.show();
    this.isError = false;
    this.movie.id = 0;
    this.movie.rating = 0;
    if (this.movie.name === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter name');
    }
    if (this.movie.originalName === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter original name');
    }
    if (this.movie.description === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter description');
    }
    if (this.movie.country === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter country');
    }
    if (this.movie.director === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter director');
    }
    if (this.movie.operator === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter operator');
    }
    if (this.movie.composer === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter composer');
    }
    if (this.movie.genre === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter genre');
    }
    if (this.movie.slogan === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter slogan');
    }
    if (this.movie.budget === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter budget');
    }
    if (this.movie.length === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter length');
    }
    if (this.movie.countViews === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter count of views');
    }
    if (this.movie.pictureUrl === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter picture url');
    }
    if (this.movie.trailerUrl === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter trailer url');
    }


    if (this.isError === false) {
      this.movieService.addMovie(this.movie).subscribe(
        (data: ApiResult) => {
          if(data.status == 200){
            this.notifier.notify('success','Movie added');
          }else{
            for (var i = 0; i < data.errors; i++) {
              this.notifier.notify('error', data.errors[i])
            }
          }
        }
      );
      this.movie.id = null;
      this.movie.name = null;
      this.movie.originalName = null;
      this.movie.description = null;
      this.movie.country = null;
      this.movie.director = null;
      this.movie.operator = null;
      this.movie.composer = null;
      this.movie.genre = null;
      this.movie.slogan = null;
      this.movie.budget = null;
      this.movie.length = null;
      this.movie.countViews = null;
      this.movie.pictureUrl = null;
      this.movie.trailerUrl = null;
    }
    this.spinner.hide();
  }

  editMovie(){
    this.movie.id = this.editMovieId;
    this.movie.rating = 0;
    this.spinner.show();
    this.isError = false;
    if (this.movie.name === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter name');
    }
    if (this.movie.originalName === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter original name');
    }
    if (this.movie.description === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter description');
    }
    if (this.movie.country === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter country');
    }
    if (this.movie.director === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter director');
    }
    if (this.movie.operator === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter operator');
    }
    if (this.movie.composer === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter composer');
    }
    if (this.movie.genre === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter genre');
    }
    if (this.movie.slogan === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter slogan');
    }
    if (this.movie.budget === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter budget');
    }
    if (this.movie.length === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter length');
    }
    if (this.movie.countViews === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter count of views');
    }
    if (this.movie.pictureUrl === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter picture url');
    }
    if (this.movie.trailerUrl === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter trailer url');
    }


    if (this.isError === false) {
      this.movieService.editMovie(this.movie).subscribe(
        (data: ApiResult) => {
          if(data.status == 200){
            this.notifier.notify('success','Movie edited');
          }else{
            for (var i = 0; i < data.errors; i++) {
              this.notifier.notify('error', data.errors[i])
            }
          }
        }
      );
      this.movie.id = null;
      this.movie.name = null;
      this.movie.originalName = null;
      this.movie.description = null;
      this.movie.country = null;
      this.movie.director = null;
      this.movie.operator = null;
      this.movie.composer = null;
      this.movie.genre = null;
      this.movie.slogan = null;
      this.movie.budget = null;
      this.movie.length = null;
      this.movie.countViews = null;
      this.movie.pictureUrl = null;
      this.movie.trailerUrl = null;
    }
    this.spinner.hide();
  }

  ngOnInit() {
    this.movieService.getAllMovies().subscribe(
      (data: MovieModel[]) => {
        this.list = data;
        console.log(this.list[0].name);
      }
    );
    this.movie.id = null;
    this.movie.name = null;
    this.movie.originalName = null;
    this.movie.description = null;
    this.movie.country = null;
    this.movie.director = null;
    this.movie.operator = null;
    this.movie.composer = null;
    this.movie.genre = null;
    this.movie.slogan = null;
    this.movie.budget = null;
    this.movie.length = null;
    this.movie.countViews = null;
    this.movie.pictureUrl = null;
    this.movie.trailerUrl = null;
  }

}
