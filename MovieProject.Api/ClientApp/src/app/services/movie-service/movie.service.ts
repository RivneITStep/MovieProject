import { Observable } from 'rxjs';
import { ApiResult } from 'src/app/models/result.model';
import { MovieModel } from '../../models/movie.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieAddModel } from 'src/app/models/movieadd.model';
import { MovieEditModel } from 'src/app/models/movieedit.model';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

constructor(private http: HttpClient) { }
  baseUrl = location.origin + '/api/movie';

  getAllMovies(){
    console.log(this.baseUrl);
    return this.http.get(this.baseUrl);
  }

  
  getMovie(id: number): Observable<MovieModel>{
    return this.http.get<MovieModel>(this.baseUrl + '/' + id);
  }

  editMovie(model: MovieEditModel){
    return this.http.post<ApiResult>(this.baseUrl + '/edit', model);
  }

  addMovie(model: MovieAddModel){
    return this.http.post<ApiResult>(this.baseUrl, model);
  }

  deleteMovie(id: number){
    return this.http.delete<ApiResult>(this.baseUrl + '/' + id);
  }

  getMovieActors(id: number){
    return this.http.get(this.baseUrl + '/' + id + '/actors');
  }

  getActorAvailableMovies(id: number){
    return this.http.get(this.baseUrl + '/' + id + '/available');
  }

  addFilmActor(movie_id: number, actor_id: number){
    return this.http.post<ApiResult>(this.baseUrl + '/' + movie_id + '/actor/' + actor_id, null);
  }

}
