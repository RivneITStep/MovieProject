import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ApiService } from '../core/api.service';
import { ActorModel } from '../models/actor/actor.model';
import { MovieModel } from '../models/movie/movie.model';
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

  constructor(private router: Router, private photoService: PhotoService, private apiService: ApiService, private notifier: NotifierService, private activateRoute: ActivatedRoute, private actorService: ActorService, private  movieService: MovieService) { 
    this.id = activateRoute.snapshot.params['id'];
    this.isAdmin = this.apiService.isAdmin();
  }
  id: number;
  thisUrl: string;
  actor: ActorModel = new ActorModel();
  isVisible: boolean = false;
  isVisible2: boolean = false;
  availableMovies: MovieModel[] = [];
  photoAddActor: PhotoAddModel = new PhotoAddModel();

  checkFilm(id: number){
    this.router.navigate(['movies/' + id]);
  }

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

  ngOnInit() {
    this.actorService.getActor(this.id).subscribe(
      (data: ActorModel) => {
        this.actor = data;
        console.log(this.actor.name);
      }
    );
  }

}
