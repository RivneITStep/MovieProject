import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CinemaModel } from '../models/cinema.model';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css']
})
export class WatchComponent implements OnInit {

  constructor(private movieService: MovieService, private activateRoute: ActivatedRoute) {
    this.id = activateRoute.snapshot.params['id'];
  }

  id: number;
  movie: CinemaModel = new CinemaModel();

  ngOnInit() {
    this.movieService.getCinemaMovie(this.id).subscribe(
      (data: CinemaModel) => {
        this.movie = data;
      }
    );

    setTimeout(
      () => {
        var video = document.getElementsByClassName('trailer')[0] as HTMLVideoElement;
        video.src = this.movie.trailerUrl;
        var video2 = document.getElementsByClassName('video-url')[0] as HTMLIFrameElement;
        video2.src = this.movie.url;
      },1000);
    
  }

}
