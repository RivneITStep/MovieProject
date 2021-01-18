import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActorModel } from '../Models/actor.model';
import { MovieModel } from '../Models/movie.model';
import { PhotoModel } from '../Models/photo.model';
import { ActorService } from '../services/actor-service/actor.service';
import { MovieService } from '../services/movie-service/movie.service';

@Component({
  selector: 'app-actorpage',
  templateUrl: './actorpage.component.html',
  styleUrls: ['./actorpage.component.css']
})
export class ActorpageComponent implements OnInit {

  constructor(private activateRoute: ActivatedRoute, private actorService: ActorService, private  movieService: MovieService) { 
    this.id = activateRoute.snapshot.params['id'];
  }

  id: number;
  thisUrl: string;
  actor: ActorModel = new ActorModel();
  actorMovies: MovieModel[] = [];
  actorPhotos: PhotoModel[] = [];
  isVisible: boolean = false;
  isVisible2: boolean = false;
  availableMovies: MovieModel[] = [];

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  addFilmToActor(){
    
  }

  ngOnInit() {
    this.actorService.getActor(this.id).subscribe(
      (data: ActorModel) => {
        this.actor = data;
        console.log(this.actor.name);
      }
    );
    this.actorService.getActorMovies(this.id).subscribe(
      (data: MovieModel[]) => {
        this.actorMovies = data;
      }
    );
    this.actorService.getActorPhotos(this.id).subscribe(
      (data: PhotoModel[]) => {
        this.actorPhotos = data;
      }
    );
    this.movieService.getActorAvailableMovies(this.id).subscribe(
      (data: MovieModel[]) => {
        this.availableMovies = data;
      }
    );
  }

}
