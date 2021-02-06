import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { MenuItem } from 'primeng/api';
import { ActorModel } from '../models/actor/actor.model';
import { CountryModel } from '../models/country.model';
import { MovieModel } from '../models/movie/movie.model';
import { ApiResult } from '../models/result.model';
import { ActorService } from '../services/actor-service/actor.service';
import { CountryService } from '../services/country-service/country.service';
import { MovieService } from '../services/movie-service/movie.service';

@Component({
  selector: 'app-actor-manager',
  templateUrl: './actor-manager.component.html',
  styleUrls: ['./actor-manager.component.css']
})
export class ActorManagerComponent implements OnInit {

  constructor(private notifier: NotifierService, private actorService: ActorService, private movieService: MovieService, private countryService: CountryService) { }

  actors: ActorModel[] = [];
  movies: MovieModel[] = [];
  countries: CountryModel[] = [];

  selectedCountry: CountryModel = new CountryModel();
  selectedActor: ActorModel = new ActorModel();
  selectedMovie: MovieModel = new MovieModel();

  displayModal: boolean = false;
  displayModal2: boolean = false;
  displayModal3: boolean = false;



  showDialog(id: number) {
    this.displayModal = true;
    this.actorService.getActor(id).subscribe(
      (data: ActorModel) => {
        this.selectedActor = data;
      }
    );
  }

  showDialog2(id: number) {
    this.displayModal2 = true;
    this.movieService.getMovie(id).subscribe(
      (data: MovieModel) => {
        this.selectedMovie = data;
      }
    );
  }

  editMovie(){
    if(this.selectedCountry != null){
      this.selectedMovie.country = this.selectedCountry.name;
    }
    this.movieService.editMovie(this.selectedMovie).subscribe(
      (data: ApiResult) => {
        if (data.status == 200) {
          this.movieService.getMovies().subscribe(
            (data: MovieModel[]) => {
              this.movies = data;
            }
          );
          this.notifier.notify('success', 'Edited');
        } else {
          this.notifier.notify('error', 'Server error');
        }
      }
    );
  }

  deleteMovie(id: number) {
    this.movieService.deleteMovie(id).subscribe(
      (data: ApiResult) => {
        if (data.status == 200) {
          this.movieService.getMovies().subscribe(
            (data: MovieModel[]) => {
              this.movies = data;
            }
          );
          this.notifier.notify('success', 'Deleted');
        } else {
          this.notifier.notify('error', 'Server error');
        }
      }
    );

  }

  editActor() {
    if (this.selectedCountry != null) {
      this.selectedActor.country = this.selectedCountry.name;
    }
    this.actorService.editActor(this.selectedActor).subscribe(
      (data: ApiResult) => {
        if (data.status == 200) {
          this.actorService.getActors().subscribe(
            (data: ActorModel[]) => {
              this.actors = data;
            }
          );
          this.notifier.notify('success', 'Edited');
        } else {
          this.notifier.notify('error', 'Server error');
        }
      }
    );
  }

  deleteActor(id: number) {
    this.actorService.deleteActor(id).subscribe(
      (data: ApiResult) => {
        if (data.status == 200) {
          this.actorService.getActors().subscribe(
            (data: ActorModel[]) => {
              this.actors = data;
            }
          );
          this.notifier.notify('success', 'Deleted');
        } else {
          this.notifier.notify('error', 'Server error');
        }
      }
    );

  }

  ngOnInit() {
    this.countryService.getCountries().subscribe(
      (data: CountryModel[]) => {
        this.countries = data;
      }
    );
    this.actorService.getActors().subscribe(
      (data: ActorModel[]) => {
        this.actors = data;
      }
    );
    this.movieService.getMovies().subscribe(
      (data: MovieModel[]) => {
        this.movies = data;
      }
    );
  }

}
