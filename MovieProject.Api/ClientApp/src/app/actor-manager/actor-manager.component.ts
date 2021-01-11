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

  div1: boolean = true;
  div2: boolean = false;

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
  actorEditId: number;
  isError: boolean = false;

  postActor() {
    this.spinner.show();
    this.isError = false;
    if (this.actor.name === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter name');
    }
    if (this.actor.surname === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter surname');
    }
    if (this.actor.age === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter age');
    }
    if (this.actor.country === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter country');
    }
    if (this.actor.description === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter description');
    }
    if (this.actor.countFilms === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter count of films');
    }
    if (this.actor.birthYear === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter birth year');
    }
    if (this.actor.pictureUrl === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter pictureUrl');
    }
    if (this.isError === false) {
      this.actorService.addActor(this.actor).subscribe(
        (data: ApiResult) => {
          if (data.status === 200) {
            this.notifier.notify('success', 'Actor added');
          } else {
            for (var i = 0; i < data.errors; i++) {
              this.notifier.notify('error', data.errors[i])
            }
          }
        }
      );
      this.actor.id = null;
      this.actor.name = null;
      this.actor.surname = null;
      this.actor.country = null;
      this.actor.birthYear = null;
      this.actor.countFilms = null;
      this.actor.pictureUrl = null;
      this.actor.description = null;
      this.actor.age = null;
    }
    this.spinner.hide();
  }

  showEditActor(id: number) {
    this.div1 = false;
    this.div2 = true;
    this.actorEditId = id;
  }

  showAddActor(){
    this.div1 = true;
    this.div2 = false;
  }

  editActor(){
    this.spinner.show();
    this.isError = false;
    if (this.actor.name === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter name');
    }
    if (this.actor.surname === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter surname');
    }
    if (this.actor.age === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter age');
    }
    if (this.actor.country === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter country');
    }
    if (this.actor.description === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter description');
    }
    if (this.actor.countFilms === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter count of films');
    }
    if (this.actor.birthYear === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter birth year');
    }
    if (this.actor.pictureUrl === null) {
      this.isError = true;
      this.notifier.notify('error', 'Enter pictureUrl');
    }
    if (this.isError === false) {
      this.actor.id = this.actorEditId;
      this.actorService.editActor(this.actor).subscribe(
        (data: ApiResult) => {
          if (data.status === 200) {
            this.notifier.notify('success', 'Actor edited');
          } else {
            for (var i = 0; i < data.errors; i++) {
              this.notifier.notify('error', data.errors[i])
            }
          }
        }
      );
      this.actor.id = null;
      this.actor.name = null;
      this.actor.surname = null;
      this.actor.country = null;
      this.actor.birthYear = null;
      this.actor.countFilms = null;
      this.actor.pictureUrl = null;
      this.actor.description = null;
      this.actor.age = null;
    }
    this.spinner.hide();
  }

  deleteActor(id: number){
    this.spinner.show();
    this.actorService.deleteActor(id).subscribe(
      (data : ApiResult) => {
        if(data.status == 200){
          this.notifier.notify('succes',"Actor deleted");
        }else{
          for (var i = 0; i < data.errors; i++) {
            this.notifier.notify('error', data.errors[i])
          }
        }
      }
    );
    this.spinner.hide();
  }

  ngOnInit() {
    this.actorService.getAllActor().subscribe(
      (data: ActorModel[]) => {
        this.list = data;
        console.log(this.list[0].name);
      }
    );
    this.actor.id = null;
    this.actor.name = null;
    this.actor.surname = null;
    this.actor.country = null;
    this.actor.birthYear = null;
    this.actor.countFilms = null;
    this.actor.pictureUrl = null;
    this.actor.description = null;
    this.actor.age = null;
  }

}