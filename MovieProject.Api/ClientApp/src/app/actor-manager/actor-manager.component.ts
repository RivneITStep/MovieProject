import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActorModel } from '../Models/actor.model';
import { MovieModel } from '../Models/movie.model';
import { ApiResult } from '../Models/result.model';
import { ActorService } from '../services/actor-service/actor.service';

@Component({
  selector: 'app-actor-manager',
  templateUrl: './actor-manager.component.html',
  styleUrls: ['./actor-manager.component.css']
})
export class ActorManagerComponent implements OnInit {

  constructor(private actorService: ActorService, private notifier: NotifierService, private spinner: NgxSpinnerService) { }

  list: ActorModel[] = [];
  name: string;
  surname: string;
  country: string;
  age: number;
  countFilms: number;
  birthYear: number;
  description: string;
  pictureUrl: string;
  actor: ActorModel = new ActorModel();

  postActor(){
    this.spinner.show();
    this.actor.name = this.name;
    this.actor.surname = this.surname;
    this.actor.age = this.age;
    this.actor.description = this.description;
    this.actor.countFilms = this.countFilms;
    this.actor.birthYear = this.birthYear;
    this.actor.pictureUrl = this.pictureUrl;
    this.actorService.addActor(this.actor).subscribe(
      (data : ApiResult) => {
        if(data.status === 200){
          this.notifier.notify('success', 'User added');
        }else{
          for(var i = 0; i < data.errors; i++){
            this.notifier.notify('error', data.errors[i])
          }
        }
        this.spinner.hide();
      }
  ); 
  }

  ngOnInit() {
    this.actorService.getAllActor().subscribe(
      (data: ActorModel[]) => {
        this.list = data;
        console.log(this.list[0].name);
      }
    );
  }

}
