import { Component, OnInit } from '@angular/core';
import { ActorModel } from '../models/actor.model';
import { MovieModel } from '../models/movie.model';
import { ActorService } from '../services/actor-service/actor.service';
import { MovieService } from '../services/movie-service/movie.service';


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor() { }


  ngOnInit() {

  }

}
