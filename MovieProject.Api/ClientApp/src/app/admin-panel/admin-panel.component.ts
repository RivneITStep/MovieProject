import { Component, OnInit } from '@angular/core';
import { ActorModel } from '../Models/actor.model';
import { MovieModel } from '../Models/movie.model';
import { ActorService } from '../services/actor-service/actor.service';
import { MovieService } from '../services/movie-service/movie.service';


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor(private actorService: ActorService, private movieService: MovieService) { }

  div1: boolean = false;
  div2: boolean = false;
  div3: boolean = false;

  count1: number;
  page1: number = 1;

  count2: number;
  page2: number = 1;

  count3: number;
  page3: number = 1;

  actorList: ActorModel[] = [];
  movieList: MovieModel[] = [];

  moviePanelClick() {
    this.div1 = true;
    this.div2 = false;
    this.div3 = false;
  }

  actorPanelClick(){
    this.div1 = false;
    this.div2 = true;
    this.div3 = false
  }

  userPanelClick(){
    this.div1 = false;
    this.div2 = false;
    this.div3 = true;
  }

  pageChanged(event){
    if(this.div1 == true){
      this.page1 = event;
    }
    if(this.div2 == true){
      this.page2 = event;
    }
    if(this.div3 == true){
      this.page3 == event;
    }
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
          window.scrollTo(0, pos - 500);
      } else {
          window.clearInterval(scrollToTop);
      }}, 16);
  }

  ngOnInit() {
    this.actorService.getAllActor().subscribe(
      (data: ActorModel[]) => {
        this.actorList = data;
        console.log(this.actorList[0].name);
      }
    );

    this.movieService.getAllMovies().subscribe(
      (data: MovieModel[]) => {
        this.movieList = data;
        console.log(this.movieList[0].name);
      }
    );
  }

}
