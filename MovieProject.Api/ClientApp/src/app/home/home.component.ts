import { MovieModel } from '../models/movie.model';
import { MovieService } from './../services/movie-service/movie.service';
import { HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private movieService: MovieService) { }
  headMovies: MovieModel[] = [];

  donateOnClick(event){
    window.open("https://www.liqpay.ua/checkout/i73130420823", "_blank");
  }

  ngOnInit() {
    this.movieService.getAllMovies().subscribe(
      (data: MovieModel[]) => {
        this.headMovies = data;
        console.log(this.headMovies[0].name);
      }
    );
  }

}
