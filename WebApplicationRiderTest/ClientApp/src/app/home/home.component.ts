import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActorModel } from '../models/actor.model';
import { MovieModel } from '../models/movie.model';
import { ActorService } from '../services/actor.service';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private sanitizer: DomSanitizer, private movieService: MovieService, private actorService: ActorService) { }
  movies: MovieModel[] = [];
  actors: ActorModel[] = [];

  getImg(url: string){
    let re = /\'/gi;
    let result = url.replace(re, '');
    return this.sanitizer.bypassSecurityTrustResourceUrl(result);
  }

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
