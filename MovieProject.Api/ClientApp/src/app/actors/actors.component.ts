import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ActorModel } from './../Models/actor.model';
import { ActorService } from './../services/actor-service/actor.service';
import { Component, OnInit } from '@angular/core';
import { PaginationControlsComponent } from 'ngx-pagination';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css']
})
export class ActorsComponent implements OnInit {

  constructor(private actorService: ActorService, private router: Router) { }

  thisUrl: string;
  actors: ActorModel[] = [];
  count: number;
  page: number = 1;

  pageChanged(event){
    this.page = event;
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
          window.scrollTo(0, pos - 500);
      } else {
          window.clearInterval(scrollToTop);
      }
  }, 16);
  }

  ngOnInit() {
    this.thisUrl = this.router.url;
    this.actorService.getAllActor().subscribe(
      (list: ActorModel[]) => {
        this.actors = list;
        this.count = list.length;
        console.log(this.actors[0].name);
      }
    )
  }

}
