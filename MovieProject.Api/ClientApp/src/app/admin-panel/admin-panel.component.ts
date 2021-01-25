import { Component, OnInit } from '@angular/core';
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
