import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ApiService } from '../core/api.service';
import { ActorModel } from '../models/actor.model';
import { MovieModel } from '../models/movie.model';
import { PhotoModel } from '../models/photo.model';
import { PhotoAddModel } from '../models/photoadd.model';
import { ApiResult } from '../models/result.model';
import { ActorService } from '../services/actor-service/actor.service';
import { MovieService } from '../services/movie-service/movie.service';
import { PhotoService } from '../services/photo-service/photo.service';

@Component({
  selector: 'app-actorpage',
  templateUrl: './actorpage.component.html',
  styleUrls: ['./actorpage.component.css']
})
export class ActorpageComponent implements OnInit {
  isAdmin: boolean;

  constructor(private photoService: PhotoService, private apiService: ApiService, private notifier: NotifierService, private activateRoute: ActivatedRoute, private actorService: ActorService, private  movieService: MovieService) { 
    this.id = activateRoute.snapshot.params['id'];
    this.isAdmin = this.apiService.isAdmin();
  }
  id: number;
  thisUrl: string;
  actor: ActorModel = new ActorModel();
  actorMovies: MovieModel[] = [];
  actorPhotos: PhotoModel[] = [];
  isVisible: boolean = false;
  isVisible2: boolean = false;
  availableMovies: MovieModel[] = [];
  photoAddActor: PhotoAddModel = new PhotoAddModel();

  showModal(): void {
    this.isVisible = true;
  }

  showModal2(): void {
    this.isVisible2 = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  handleOk2(): void {
    console.log('Button ok clicked!');
    this.isVisible2 = false;
  }

  handleCancel2(): void {
    console.log('Button cancel clicked!');
    this.isVisible2 = false;
  }

  addFilmToActor(movie_id: number){
    this.movieService.addFilmActor(movie_id, this.id).subscribe(
      (data: ApiResult) => {
        if(data.status == 200){
          this.movieService.getMovie(movie_id).subscribe(
            (data: MovieModel) => {
              this.actorMovies.push(data);
            }
          );
          this.notifier.notify('success','Movie actor added to film');
        }else{
          for (var i = 0; i < data.errors; i++) {
            this.notifier.notify('error', data.errors[i])
          }
        }
      }
    );
  }

  addPhotoToActor(){
    this.photoAddActor.actorId = this.id;
    this.photoService.addActorPhoto(this.photoAddActor).subscribe(
      (data: ApiResult) => {
        if(data.status == 200){
          this.photoService.getActorPhoto(this.photoAddActor).subscribe(
            (data: PhotoModel) => {
              this.actorPhotos.push(data);
            }
          );
          this.notifier.notify('success','Actor photo added');
        }else{
          for (var i = 0; i < data.errors; i++) {
            this.notifier.notify('error', data.errors[i])
          }
        }
      }
    );
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
