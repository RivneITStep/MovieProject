import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActorModel } from '../models/actor.model';
import { MovieModel } from '../models/movie.model';
import { ActorService } from '../services/actor.service';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private sanitizer: DomSanitizer, private movieService: MovieService, private actorService: ActorService) { }


  ngOnInit() {

  }
}
