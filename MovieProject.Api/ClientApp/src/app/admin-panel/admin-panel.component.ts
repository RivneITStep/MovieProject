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
  div4: boolean = false;
  div5: boolean = false;

  actorList: ActorModel[] = [];
  movieList: MovieModel[] = [];

  actorAddModel: ActorModel;
  movieAddModel: MovieModel;

  moviePanelClick() {
    this.div1 = true;
    this.div2 = false;
    this.div3 = false;
    this.div4 = false;
    this.div5 = false;
  }

  actorPanelClick(){
    this.div1 = false;
    this.div2 = true;
    this.div3 = false;
    this.div4 = false;
    this.div5 = false;
  }

  userPanelClick(){
    this.div1 = false;
    this.div2 = false;
    this.div3 = true;
    this.div4 = false;
    this.div5 = false;
  }

  movieAddClick(){
    this.div1 = false;
    this.div2 = false;
    this.div3 = false;
    this.div4 = true;
    this.div5 = false;
  }

  actorAddClick(){
    this.div1 = false;
    this.div2 = false;
    this.div3 = false;
    this.div4 = false;
    this.div5 = true;
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
