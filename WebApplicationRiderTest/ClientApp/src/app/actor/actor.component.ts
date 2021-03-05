import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ApiService } from '../core/api.service';
import { ActorModel } from '../models/actor.model';
import { MovieModel } from '../models/movie.model';
import { PhotoModel } from '../models/photo.model';
import { PhotoAddModel } from '../models/photoadd.model';
import { ApiResult } from '../models/result.model';
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

  constructor(private confirmationService: ConfirmationService, private sanitizer: DomSanitizer, private messageService: MessageService, private router: Router, private photoService: PhotoService, private apiService: ApiService, private activateRoute: ActivatedRoute, private actorService: ActorService, private movieService: MovieService) {
    this.id = activateRoute.snapshot.params['id'];
    this.isAdmin = this.apiService.isAdmin();
    this.responsiveOptions = [
      {
        breakpoint: '1500px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '1024px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '768px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }
  id: number;
  thisUrl: string;
  actor: ActorModel = new ActorModel();
  display: boolean = false;
  display2: boolean = false;
  responsiveOptions: any;
  availableMovies: MovieModel[] = [];
  actorPhotos: PhotoModel[] = [];
  actorMovies: MovieModel[] = [];
  photoAddActor: PhotoAddModel = new PhotoAddModel();

  deleteActor(){
    this.actorService.deleteActor(this.id).subscribe(
      (data: ApiResult) => {
        if(data.status == 200){
          this.messageService.add({ severity: 'success', summary: 'Notify', detail: 'Actor deleted' });
          this.router.navigate(['/actors']);
        }else{
          this.messageService.add({ severity: 'error', summary: 'Notify', detail: 'Server error' });
        }
      }
    );
  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this actor?',
      accept: () => {
        this.deleteActor();
        
      }
    });
  }

  addActorPhoto() {
    if (this.photoAddActor.pictureUrl === '') {
      this.messageService.add({ severity: 'error', summary: 'Notify', detail: 'Enter url' });
    } else {
      this.photoAddActor.actorId = this.id;
      this.photoService.addActorPhoto(this.photoAddActor).subscribe(
        (data: ApiResult) => {
          if (data.status == 200) {
            this.photoService.getActorPhotos(this.id).subscribe(
              (data: PhotoModel[]) => {
                this.actorPhotos = data;
              }
            );
            this.messageService.add({ severity: 'success', summary: 'Notify', detail: 'Actor photo posted' });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Notify', detail: 'Server error' });
          }
        }
      );
    }
  }

  deleteActorPhoto(id: number) {
    this.photoService.deleteActorPhoto(this.id, id).subscribe(
      (data: ApiResult) => {
        if (data.status == 200) {
          this.photoService.getActorPhotos(this.id).subscribe(
            (data: PhotoModel[]) => {
              this.actorPhotos = data;
            }
          );
          this.messageService.add({ severity: 'success', summary: 'Notify', detail: 'Actor photo deleted' });
        }
      }
    );
  }

  showPhotoDeleteManager() {
    this.display = true;
  }

  showPhotoAddManager() {
    this.display2 = true;
  }

  checkFilm(id: number) {
    this.router.navigate(['movies/' + id]);
  }

  getImg(url: string) {
    let re = /\'/gi;
    let result = url.replace(re, '');
    return this.sanitizer.bypassSecurityTrustResourceUrl(result);
  }

  ngOnInit() {
    this.actorService.getActor(this.id).subscribe(
      (data: ActorModel) => {
        this.actor = data;
      }
    );
    this.photoService.getActorPhotos(this.id).subscribe(
      (data: PhotoModel[]) => {
        this.actorPhotos = data;
      }
    );
    this.actorService.getActorMovies(this.id).subscribe(
      (data: MovieModel[]) => {
        this.actorMovies = data;
      }
    );

  }

}
