import { MovieModel } from '../models/movie/movie.model';
import { MovieService } from './../services/movie-service/movie.service';
import { HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { AOS } from 'aos';
import { ActorModel } from '../models/actor/actor.model';
import { ActorService } from '../services/actor-service/actor.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private movieService: MovieService, private actorService: ActorService) { }
  movies: MovieModel[] = [];
  actors: ActorModel[] = [];

  ngOnInit() {
    this.movieService.getMovies().subscribe(
      (data: MovieModel[]) => {
        this.movies = data;
        console.log(this.movies[0].name);
      }
    );
    this.actorService.getActors().subscribe(
      (data: ActorModel[]) => {
        this.actors = data;
      }
    );
  }

}
