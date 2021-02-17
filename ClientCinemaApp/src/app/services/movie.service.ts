import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieModel } from '../models/movie.model';
import { VideoModel } from '../models/video.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:5000/api/movie';

  getMovies(): Observable<MovieModel[]> {
    return this.http.get<MovieModel[]>(this.baseUrl);
  }

  getMovie(id: number) : Observable<MovieModel> {
    return this.http.get<MovieModel>(this.baseUrl + '/' + id);
  }

  getMovieVideo(id: number): Observable<VideoModel>{
    return this.http.get<VideoModel>(this.baseUrl + '/' + id + '/video');
  }

}
