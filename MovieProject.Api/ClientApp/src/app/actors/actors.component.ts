import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ActorModel } from './../Models/actor.model';
import { ActorService } from './../services/actor-service/actor.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css']
})
export class ActorsComponent implements OnInit {

  constructor(private actorService: ActorService, private router: Router) { }

  thisUrl: string;
  actors: ActorModel[] = [];

  ngOnInit() {
    this.thisUrl = this.router.url;
    this.actorService.getAllActor().subscribe(
      (list: ActorModel[]) => {
        this.actors = list;
        console.log(this.actors[0].name);
      }
    )
  }

}
