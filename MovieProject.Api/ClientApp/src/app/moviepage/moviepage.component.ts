import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieModel } from '../Models/movie.model';
import { MovieService } from '../services/movie-service/movie.service';

@Component({
  selector: 'app-moviepage',
  templateUrl: './moviepage.component.html',
  styleUrls: ['./moviepage.component.css']
})
export class MoviepageComponent implements OnInit {

  constructor(private activateRoute: ActivatedRoute, private movieService: MovieService ) { 
    this.id = activateRoute.snapshot.params['id'];
  }

  id: number;
  thisUrl: string;
  movie: MovieModel;
  
  ngOnInit() {
    this.movieService.getMovie(this.id).subscribe(
      (data: MovieModel) => {
        this.movie = data;
        console.log(data.name);
      }
    )
  }

}
