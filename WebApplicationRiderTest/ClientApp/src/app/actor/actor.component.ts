import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../core/api.service';
import { ActorModel } from '../models/actor.model';
import { MovieModel } from '../models/movie.model';
import { PhotoAddModel } from '../models/photoadd.model';
import { ActorService } from '../services/actor.service';
import { MovieService } from '../services/movie.service';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit {

  isAdmin: boolean;

  constructor(private router: Router, private photoService: PhotoService, private apiService: ApiService, private activateRoute: ActivatedRoute, private actorService: ActorService, private movieService: MovieService) {
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

  checkFilm(id: number) {
    this.router.navigate(['movies/' + id]);
  }

  showModal(): void {
    this.isVisible = true;
  }

  showModal2(): void {
    this.isVisible2 = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  handleOk2(): void {
    this.isVisible2 = false;
  }

  handleCancel2(): void {
    this.isVisible2 = false;
  }

  ngOnInit() {
    this.actorService.getActor(this.id).subscribe(
      (data: ActorModel) => {
        this.actor = data;
      }
    );
  }

}
