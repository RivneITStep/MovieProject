import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { MovieModel } from '../models/movie.model';
import { MovieAddModel } from '../models/movieadd.model';
import { MovieEditModel } from '../models/movieedit.model';
import { ApiResult } from '../models/result.model';
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
  movieAdd: MovieAddModel = new MovieAddModel();
  movieEdit: MovieEditModel = new MovieEditModel();

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
    if (this.movieAdd.name === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter name');
    }
    if (this.movieAdd.originalName === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter original name');
    }
    if (this.movieAdd.description === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter description');
    }
    if (this.movieAdd.country === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter country');
    }
    if (this.movieAdd.director === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter director');
    }
    if (this.movieAdd.operator === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter operator');
    }
    if (this.movieAdd.composer === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter composer');
    }
    if (this.movieAdd.genre === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter genre');
    }
    if (this.movieAdd.slogan === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter slogan');
    }
    if (this.movieAdd.budget === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter budget');
    }
    if (this.movieAdd.length === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter length');
    }
    if (this.movieAdd.countViews === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter count of views');
    }
    if (this.movieAdd.pictureUrl === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter picture url');
    }
    if (this.movieAdd.trailerUrl === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter trailer url');
    }


    if (this.isError === false) {
      this.movieService.addMovie(this.movieAdd).subscribe(
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
      this.movieAdd.name = null;
      this.movieAdd.originalName = null;
      this.movieAdd.description = null;
      this.movieAdd.country = null;
      this.movieAdd.director = null;
      this.movieAdd.operator = null;
      this.movieAdd.composer = null;
      this.movieAdd.genre = null;
      this.movieAdd.slogan = null;
      this.movieAdd.budget = null;
      this.movieAdd.length = null;
      this.movieAdd.countViews = null;
      this.movieAdd.pictureUrl = null;
      this.movieAdd.trailerUrl = null;
    }
    this.spinner.hide();
  }

  editMovie(){
    this.movieEdit.id = this.editMovieId;
    this.spinner.show();
    this.isError = false;
    if (this.movieEdit.name === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter name');
    }
    if (this.movieEdit.originalName === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter original name');
    }
    if (this.movieEdit.description === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter description');
    }
    if (this.movieEdit.country === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter country');
    }
    if (this.movieEdit.director === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter director');
    }
    if (this.movieEdit.operator === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter operator');
    }
    if (this.movieEdit.composer === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter composer');
    }
    if (this.movieEdit.genre === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter genre');
    }
    if (this.movieEdit.slogan === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter slogan');
    }
    if (this.movieEdit.budget === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter budget');
    }
    if (this.movieEdit.length === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter length');
    }
    if (this.movieEdit.countViews === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter count of views');
    }
    if (this.movieEdit.pictureUrl === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter picture url');
    }
    if (this.movieEdit.trailerUrl === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter trailer url');
    }


    if (this.isError === false) {
      this.movieService.editMovie(this.movieEdit).subscribe(
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
      this.movieEdit.id = null;
      this.movieEdit.name = null;
      this.movieEdit.originalName = null;
      this.movieEdit.description = null;
      this.movieEdit.country = null;
      this.movieEdit.director = null;
      this.movieEdit.operator = null;
      this.movieEdit.composer = null;
      this.movieEdit.genre = null;
      this.movieEdit.slogan = null;
      this.movieEdit.budget = null;
      this.movieEdit.length = null;
      this.movieEdit.countViews = null;
      this.movieEdit.pictureUrl = null;
      this.movieEdit.trailerUrl = null;
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
